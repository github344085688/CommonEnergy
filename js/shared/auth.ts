import session from './session';
import facilityService from "../services/facility-service";
import { map, keyBy, forEach, isEmpty } from 'lodash-es';
import organizationService from "../services/organization-service";
import StepsService from "../services/steps-service";
import WiseVue from "../shared/wise-vue";
export class Auth extends WiseVue {
    isSignIn() {
        return session.getUserId();
    }

    private async saveStep(params: any) {
        return new Promise((resolve, reject) => {
            let keyBySteps = keyBy(StepsService.steps(), 'step');
            organizationService.stepRecord({
                orgId: params.orgId,
                step: keyBySteps[params.saveStep]['label']
            }).subscribe(
                (res: any) => {
                    if (isEmpty(res)) {
                        this.$message.error(`Backend return empty complete steps information! It will impact the rendering of right sidebar.`);
                    }
                    session.setCurrentCompleteSteps(res);
                    session.setUserCompletionSteps(Number(params.saveStep));
                    resolve('res');
                },
                err => {
                    this.error(err);
                    reject(err);
                }
            );
        });
    }

    async setUserCompletion(params: any, form: any, to: any) {
        return new Promise((resolve, reject) => {
            if (params.orgId && params.saveStep) {
                this.saveStep(params).then(
                    res => {
                        resolve('res');
                    }
                );
            }
            else resolve('res');
        });

    }

    async initialRequiredUserInfo(userLoginedResult: any) {
        console.log(userLoginedResult);
        session.setUserToken(userLoginedResult.oAuthToken);
        session.setUserId(userLoginedResult.idmUserId);
        session.setUserView(userLoginedResult.userView);
        session.setJiraName(userLoginedResult.userView.jiraName);
        session.setPosition(userLoginedResult.userView.position);
        let userPermissions: Array<any> = [];
        forEach(map(userLoginedResult.userPermissions, 'name'), Permission => {
            if (Permission.indexOf('OnBoard') > -1)
                userPermissions.push(Permission);
        });
        session.setUserPermission(userPermissions);
        session.setAssignedCompanyFacilities(userLoginedResult.userView.assignedCompanyFacilities);
        session.setCurrentCompanyFacility(userLoginedResult.userView.defaultCompanyFacility);
        await this.assignedCompanyFacilities();
    }

    private  assignedCompanyFacilities() {
        return new Promise((resolve, reject) => {
            let sessioncompanyFacility = session.getCurrentCompanyFacility();
            facilityService.search({ids: map(session.getAssignedCompanyFacilities(), 'facilityId')}).subscribe(
                (res: any) => {
                    session.setFacilityByUserSelect(res);
                    let keyBycompanyFacilitys = keyBy(res, 'id');
                    sessioncompanyFacility.Facility = keyBycompanyFacilitys[sessioncompanyFacility.facilityId];
                    session.setCurrentCompanyFacility(sessioncompanyFacility);
                    resolve(res);
                },
                err => {
                    reject(err);
                },
            );
        });

    }

}

export default new Auth();
