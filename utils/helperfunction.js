export function getRouteApi(roleName){
    if (roleName ==='admin'){
        return '/api/admin'
    }else{
        return '/api/user'
    }
}