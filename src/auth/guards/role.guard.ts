
import { CanActivate, ExecutionContext, mixin, Type } from '@nestjs/common';
import { Role } from '../emuns/role.enum';
import RequestWithUser from '../requestWithUser';

 
const RoleGuard = (role: Role): Type<CanActivate> => {
  class RoleGuardMixin implements CanActivate {
    canActivate(context: ExecutionContext) {
      const request = context.switchToHttp().getRequest<RequestWithUser>();
      const user = request.user;
      console.log(request)
      return user?.role.includes(role);
    }
  }
 
  return mixin(RoleGuardMixin);
}
 
export default RoleGuard;