import { 
    userTypesArray, 
    userTypes, 
    userStatusTypes, 
    userStatusTypesArray, 
    errorTypes 
} from '@/constants';
import store from '@/store';

const cheekyLoads = {
    projects: {
        remove: {
            slug: 'deleteProject',
            load: 'projects/remove/load',
            stopLoading: 'projects/remove/stopLoading',
        },
    },
    modules: {
        remove: {
            slug: 'deleteModule',
            load: 'modules/remove/load',
            stopLoading: 'modules/remove/stopLoading',
        },
        add: {
            slug: 'createModule',
            load: 'modules/add/load',
            stopLoading: 'modules/add/stopLoading',
        },
        accept: {
            slug: 'acceptModule',
            load: 'modules/accept/load',
            stopLoading: 'modules/accept/stopLoading',
        },
        reject: {
            slug: 'rejectModule',
            load: 'modules/reject/load',
            stopLoading: 'modules/reject/stopLoading',
        },
        assignDev: {
            slug: 'assignDevToModule',
            load: 'modules/assignDev/load',
            stopLoading: 'modules/assignDev/stopLoading',
        },
    },
    team: {
        inviteUser: {
            slug: 'inviteUser',
            load: 'team/inviteUser/load',
            stopLoading: 'team/inviteUser/stopLoading',
        },
        removeUser: {
            slug: 'removeUser',
            load: 'team/removeUser/load',
            stopLoading: 'team/removeUser/stopLoading',
        },
        suspendUser: {
            slug: 'suspendUser',
            load: 'team/suspendUser/load',
            stopLoading: 'team/suspendUser/stopLoading',
        },
    },
}

export function cheekyReloadStore (dargs) {
        const vm = this
        let type = dargs.type
        let loadId = dargs.loadId
        let reloadAction = dargs.reloadAction
        let reloadArgs = dargs.reloadArgs
        let loader = false
        let newArgs = reloadArgs
        const authenticate = dargs.authenticate
        try {
            newArgs.noLoad = true
        } catch (TypeError) {
            // Not an object
        }

        switch (type) {
            case cheekyLoads.projects.remove.slug:
                loader = {
                    load: {
                        namespace: cheekyLoads.projects.remove.load,
                        args: loadId
                    },
                    stopLoading: {
                        namespace: cheekyLoads.projects.remove.stopLoading,
                        args: loadId
                    },
                }
                break
            case cheekyLoads.modules.remove.slug:
                loader = {
                    load: {
                        namespace: cheekyLoads.modules.remove.load,
                        args: loadId
                    },
                    stopLoading: {
                        namespace: cheekyLoads.modules.remove.stopLoading,
                        args: loadId
                    },
                }
                break
            case cheekyLoads.modules.add.slug:
                loader = {
                    load: {
                        namespace: cheekyLoads.modules.add.load,
                        args: loadId
                    },
                    stopLoading: {
                        namespace: cheekyLoads.modules.add.stopLoading,
                        args: loadId
                    },
                }
                break
            case cheekyLoads.modules.accept.slug:
                loader = {
                    load: {
                        namespace: cheekyLoads.modules.accept.load,
                        args: loadId
                    },
                    stopLoading: {
                        namespace: cheekyLoads.modules.accept.stopLoading,
                        args: loadId
                    },
                }
                break
            case cheekyLoads.modules.reject.slug:
                loader = {
                    load: {
                        namespace: cheekyLoads.modules.reject.load,
                        args: loadId
                    },
                    stopLoading: {
                        namespace: cheekyLoads.modules.reject.stopLoading,
                        args: loadId
                    },
                }
                break
            case cheekyLoads.modules.assignDev.slug:
                loader = {
                    load: {
                        namespace: cheekyLoads.modules.assignDev.load,
                        args: loadId
                    },
                    stopLoading: {
                        namespace: cheekyLoads.modules.assignDev.stopLoading,
                        args: loadId
                    },
                }
                break
            case cheekyLoads.team.inviteUser.slug:
                loader = {
                    load: {
                        namespace: cheekyLoads.team.inviteUser.load,
                        args: loadId
                    },
                    stopLoading: {
                        namespace: cheekyLoads.team.inviteUser.stopLoading,
                        args: loadId
                    },
                }
                break
            case cheekyLoads.team.suspendUser.slug:
                loader = {
                    load: {
                        namespace: cheekyLoads.team.suspendUser.load,
                        args: loadId
                    },
                    stopLoading: {
                        namespace: cheekyLoads.team.suspendUser.stopLoading,
                        args: loadId
                    },
                }
                break
            case cheekyLoads.team.removeUser.slug:
                loader = {
                    load: {
                        namespace: cheekyLoads.team.removeUser.load,
                        args: loadId
                    },
                    stopLoading: {
                        namespace: cheekyLoads.team.removeUser.stopLoading,
                        args: loadId
                    },
                }
                break
            default:
                try {
                    newArgs.noLoad = true
                } catch (TypeError) {
                    // Not an object
                }
        }
        try {
            newArgs.loader = loader
        } catch (TypeError) {
            // Not an object
        }

        if(authenticate) {
            authenticate({
                parameters: newArgs,
                action: reloadAction,
            })
        } else {
            reloadAction(newArgs);
        }
}


export function getUserTypeName(id) {
    /**
     * Get name equivalent to user type id
     */
    // const userTypes = userTypesArray;
    for (const type of userTypesArray) {
        if(type.value === id) {
            return type.name
        }
    }
    return ''
}


export function getUserStatusName(id) {
    /**
     * Get name equivalent to user type id
     */
    // const statusTypes = userStatusTypesArray;
    for (const type of userStatusTypesArray) {
        if(type.id === id) {
            return type.name
        }
    }
    return ''
}


export function getUserStatusMessage(id) {
    /**
     * Get message equivalent to user status id
     */
    // const statusTypes = userStatusTypesArray;
    for (const type of userStatusTypesArray) {
        if(type.id === id) {
            return type.message
        }
    }
    return ''
}

export function isUserSuspended(status) {
    /**
     * Return true if the status is suspended
     */
    // const statusTypes = userStatusTypes;
    return status === userStatusTypes.suspended.id
}

export function isUserDeleted(status) {
    /**
     * Return true if the status is deleted
     */
    // const statusTypes = userStatusTypes;
    return status === userStatusTypes.deleted.id
}

export function redirectLogin (vm, emsg) {
    if (!emsg) {
        emsg = false
    }
    store.dispatch('auth/setRedirectError', emsg, {root: true}).then(function () {
    });
    vm.$router.push('/login/?redirectUrl=' + vm.$route.fullPath);
}

export function redirectLoginNoBack (vm, emsg) {
    if (!emsg) {
        emsg = false
    }
    store.dispatch('auth/setRedirectError', emsg, {root: true}).then(function () {
    });
    vm.$router.push('/login');
}

export function destroyedHook (extraResets) {
    const vm = this
    if (vm.clearFields) {
        vm.clearFields()
    }
    vm.resetState();
    if (extraResets) {
        for (let reset of extraResets) {
            vm[reset]()
        }
    }
}

export function clearValidator (vm) {
    vm.errors.clear()
}

export const modalShow = {
    true: function (vm) {
        vm.hideFieldErrors = false
        clearValidator(vm)
    },
    false: function (vm, extraResets) {
        vm.hideFieldErrors = true
        vm.$_$destroyedHook(extraResets);
    },
}

export const editModal = {
    show: {
        true: function (vm) {
            clearValidator(vm)
            vm.setFields()
        },
        false: function (vm, extraResets) {
            destroyedHook(vm, extraResets);
        },
    },
    prefillReady (vm) {
        vm.setFields()
    }
}

export function redirectHome (vm, type) {
    if (type === userTypes.client.id || type === userTypes.client.slug) {
        vm.$router.push({ name: 'projects' });
    } else if (type === userTypes.developer.id || type === userTypes.developer.slug) {
        vm.$router.push({ name: 'projects' });
    } else if (type === userTypes.projectManager.id || type === userTypes.projectManager.slug) {
        vm.$router.push({ name: 'projects' });
    } else {
        vm.$router.push('/');
    }
}

export function closeModal () {
        this.$emit('close');
}

export function logout (vm, reallogout, redirect) {
    const self = vm;
    reallogout()
    .then(function (status) {
        if(status) {
            redirect();
        } else {
        }
    });
}
//
//export const notification = require("notification-component");

//export const notification;

export const currencySymbol = '₦'
