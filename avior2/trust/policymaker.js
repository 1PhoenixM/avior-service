//CRUD (create, read, update, delete) access control, policies
//what roles can do what?
//ROLES:
///////
//////guest (read-only)
//////user (most functions excluding advanced)
/////admin (all functions)

if (route === '/controllers' || route === '/hosts' || route === '/switches' || route === '/topology'){
    //These are read-only routes - "GET" routes that show data. Note that not all GETs are read-only!
    //This may have to be by the capability / plugin and not by the route.
    //all users are allowed
}

else if (route === '/staticflowmanager' || route === '/firewall'){
    //These routes include PUT, POST and DELETE.
    //Guests are not allowed.
    //Admins are allowed. Users may be allowed.
}

//etc.
//customization: roles to capabilities. by the user.
//roles: unknown, staff, admin. default