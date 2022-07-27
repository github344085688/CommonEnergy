import { Vue } from "vue-property-decorator";
import { Subscription } from "rxjs/Subscription";
import { map, keyBy, forEach, clone, find, isEmpty } from "lodash-es";
import session from './session';
import StepsService from "../services/steps-service";

export default class WiseVue extends Vue {

  unsubcribers: Subscription[] = [];

  getFacilityByUserSelect() {
    let facility = session.getFacilityByUserSelect();
    if (!facility) {
      facility = this.getAssignedCompanyFacilities()[0];
    }
    return facility;
  }

  getAssignedCompanyFacilities() {
    let assignedCompanyFacilities = session.getAssignedCompanyFacilities();
    let facilities = map(assignedCompanyFacilities, "facility");
    return facilities;
  }

  routerSetUserCompletionSteps(step: any, isSesson: boolean = false) {
    if (isSesson) {
      session.setUserCompletionSteps(step);
      return;
    }
    if (session.getUserCompletionSteps() < step) session.setUserCompletionSteps(step);
  }

  getPageStatusInformation() {
    let params = this.$route;
    let customerIdCompany: any = {};
    customerIdCompany.orgId = params.params.orgId ? params.params.orgId : session.getOrgId();
    let keys = keyBy(StepsService.steps(), 'routerName');
    let step = params.name ? Number(keys[params.name]['step']) : 0;
    if (customerIdCompany.orgId) {
      let pathLabel = params.name ? keys[params.name]['label'] : '';
      customerIdCompany.currentCompleteSteps = session.getCurrentCompleteSteps();
      let currentCompleteSteps = map(customerIdCompany.currentCompleteSteps, "stepName");
      if (currentCompleteSteps.indexOf(pathLabel) > -1) customerIdCompany.isUpdate = true;
    }
    customerIdCompany.company = session.getCurrentCompanyFacility();
    customerIdCompany.sessionStep = session.getUserCompletionSteps();
    let permissions = session.getUserPermission();
    if (!params.name || !keys[params.name] || !keys[params.name].permission) this.$set(customerIdCompany, 'Permission', 'write');
    else {
      let stepPermission = keys[params.name].permission;
      let routerPermission: Array<any> = [];
      forEach(permissions, permission => {
        if (permission.indexOf(stepPermission) > -1) routerPermission.push(permission);
      });
      let joinPermission = routerPermission.join(',');
      if (joinPermission.indexOf('_read') > -1) this.$set(customerIdCompany, 'Permission', 'read');
      if (joinPermission.indexOf('_write') > -1) this.$set(customerIdCompany, 'Permission', 'write');
      if (joinPermission.indexOf('_write') < 0 && joinPermission.indexOf('_read') < 0) this.$set(customerIdCompany, 'Permission', '');
    }
    return customerIdCompany;
  }

    async goToRouter(routerName: any) {
        let state = this.getPageStatusInformation();
        let customerId = state.orgId;
        let keys = keyBy(StepsService.steps(), 'routerName');
        let step = Number(keys[routerName]['step']) - 1;
        let params: any = {step: step.toString(), orgId: customerId, saveStep: step.toString()};
        await this.goPermissionRouter(routerName, step.toString(), params);

    }

  async goPermissionRouter(routerName: any, step: any = null, params: any) {
    if (!step) {
      this.$router.replace({name: routerName, params: params});
      return;
    }
    // this.$router.replace(params);
    let permissions = session.getUserPermission();
    let steps = StepsService.steps();
    let keyByRouterName = keyBy(steps, 'routerName');
    let joinPermission = permissions.join(',');
    if (!keyByRouterName[routerName] || !keyByRouterName[routerName]['permission']) {
      this.$router.replace({name: routerName, params: params});
      return;
    }
    let gorouterPermission = `${keyByRouterName[routerName]['permission']}_write`;
    if (joinPermission.indexOf(gorouterPermission) > -1) {
      this.$router.replace({name: routerName, params: params});
      return;
    }
    let routerStep = keyByRouterName[routerName]['step'];
    let permissionRouter = this._getPermissionRouterStep(steps, routerStep, joinPermission);
    let routerParams = clone(params);
    routerParams.step = permissionRouter.step;
    routerParams.routerName = permissionRouter.routerName;
    this.$router.replace({name: permissionRouter.routerName, params: routerParams});
  }

  private _getPermissionRouterStep(steps: any, routerStep: any, joinPermission: any) {
    let permissionStep: any = '';
    let isfiterpermission = false;
    forEach(steps, step => {
      if (step.step && step.step > routerStep) {
        let permission = `${step.permission}_write`;
        if (!isfiterpermission) {
          if (joinPermission.indexOf(permission) > -1) {
            isfiterpermission = true;
            permissionStep = step;

          }
        }
      }
    });
    return permissionStep;
  }

  getCurrentStepDetail(completedSteps: any[]) {
    if (isEmpty(completedSteps)) {
      completedSteps = session.getCurrentCompleteSteps();
    }
    return find(completedSteps, o => o.stepName === this.$route.name);
  }
}
