import api from '@/api/projects'
// import store from '@/store'

// Remember to update resetState mutation
const state = {
    sub: {
        error: false,
        fieldErrors: {},
        successMsg: 'Project was created successfully.',
        loading: false,
        files: [],
        uploads: [],
        unauthorized: null,
        unverified: null,
        notfound: false,
    },
};

// getters
const getters = {
    error: state => state.sub.error,
    fieldErrors: state => state.sub.fieldErrors,
    notfound: state => state.sub.notfound,
    unauthorized: state => state.sub.unauthorized,
    unverified: state => state.sub.unverified,
    files: state => state.sub.files,
    uploads: state => state.sub.uploads,
    successMsg: state => state.sub.successMsg,
    loading: state => state.sub.loading,
}

// actions
const actions = {
    fetchUploads({commit, state, dispatch}, dargs){
      if (dargs.noLoad !== true) {
        commit('loading')
      } else if (dargs.loader) {
        const load = dargs.loader.load
        dispatch(load.namespace, load.args, { root: true }).then(() => {
        });
      }

      api.getAllUploads(dargs)
      .then((result) => {
        if (result.error === undefined) {
          commit('clearErrors');
          // Use response data
          const data = result.data
          commit('setUploads', data);

        } else {
          if (result.unauthorized) {
            commit('isAuthError');
          }
          if (result.verified) {
            commit('isVerificationError');
          }
          commit('setError', result.error);
          commit('setNotFound', result.notfound);
        }

        // Not Loading
        if (dargs.noLoad !== true) {
          commit('notLoading')
        } else if (dargs.loader) {
          const load = dargs.loader.stopLoading
          dispatch(load.namespace, load.args, { root: true }).then(() => {
          });
        }
      })
    },

    fetchShared({commit, state, dispatch}, dargs){
      if (dargs.noLoad !== true) {
        commit('loading')
      } else if (dargs.loader) {
        const load = dargs.loader.load
        dispatch(load.namespace, load.args, { root: true }).then(() => {
        });
      }

      api.getAllShares(dargs)
      .then((result) => {
        if (result.error === undefined) {
          commit('clearErrors');
          // Use response data
          const data = result.data
          commit('setFiles', data);

        } else {
          if (result.unauthorized) {
            commit('isAuthError');
          }
          if (result.verified) {
            commit('isVerificationError');
          }
          commit('setError', result.error);
          commit('setNotFound', result.notfound);
        }

        // Not Loading
        if (dargs.noLoad !== true) {
          commit('notLoading')
        } else if (dargs.loader) {
          const load = dargs.loader.stopLoading
          dispatch(load.namespace, load.args, { root: true }).then(() => {
          });
        }
      })
    },

    shareThisFile({commit, state, dispatch}, dargs){
      if (dargs.noLoad !== true) {
        commit('loading')
      } else if (dargs.loader) {
        const load = dargs.loader.load
        dispatch(load.namespace, load.args, { root: true }).then(() => {
        });
      }

      api.share(dargs)
      .then((result) => {
        if (result.error === undefined) {
          commit('clearErrors');
          // Use response data
          const data = result.data

        } else {
          if (result.unauthorized) {
            commit('isAuthError');
          }
          if (result.verified) {
            commit('isVerificationError');
          }
          commit('setError', result.error);
          commit('setNotFound', result.notfound);
        }

        // Not Loading
        if (dargs.noLoad !== true) {
          commit('notLoading')
        } else if (dargs.loader) {
          const load = dargs.loader.stopLoading
          dispatch(load.namespace, load.args, { root: true }).then(() => {
          });
        }
      })
    },
    updateThisFile({commit, state, dispatch}, dargs){
      if (dargs.noLoad !== true) {
        commit('loading')
      } else if (dargs.loader) {
        const load = dargs.loader.load
        dispatch(load.namespace, load.args, { root: true }).then(() => {
        });
      }

      return api.update(dargs)
      .then((result) => {
        if (result.error === undefined) {
          commit('clearErrors');
          // Use response data
          const data = result.data

        } else {
          if (result.unauthorized) {
            commit('isAuthError');
          }
          if (result.verified) {
            commit('isVerificationError');
          }
          commit('setError', result.error);
          commit('setNotFound', result.notfound);
        }

        // Not Loading
        if (dargs.noLoad !== true) {
          commit('notLoading')
        } else if (dargs.loader) {
          const load = dargs.loader.stopLoading
          dispatch(load.namespace, load.args, { root: true }).then(() => {
          });
        }
      })
    },
    deleteUploaded({commit, state, dispatch}, dargs){
      if (dargs.noLoad !== true) {
        commit('loading')
      } else if (dargs.loader) {
        const load = dargs.loader.load
        dispatch(load.namespace, load.args, { root: true }).then(() => {
        });
      }

      api.deleteFiles(dargs)
      .then((result) => {
        if (result.error === undefined) {
          commit('clearErrors');
          // Use response data
          const data = result.data;
          commit('setUploads', data);
        } else {
          if (result.unauthorized) {
            commit('isAuthError');
          }
          if (result.verified) {
            commit('isVerificationError');
          }
          commit('setError', result.error);
          commit('setNotFound', result.notfound);
        }

        // Not Loading
        if (dargs.noLoad !== true) {
          commit('notLoading')
        } else if (dargs.loader) {
          const load = dargs.loader.stopLoading
          dispatch(load.namespace, load.args, { root: true }).then(() => {
          });
        }
      })
    },

    clearErrors ({ commit, state }) {
        commit('clearErrors');
    },
    clearFieldErrors ({ commit, state }) {
        commit('clearErrors');
    },
    resetState ({ commit, state }) {
        commit('resetState');
    },
    load ({ commit, state }, id) {
        commit('loading', id);
    },
    stopLoading ({ commit, state }, id) {
        commit('notLoading', id);
    },
}

// mutations
const mutations = {
    loading (state) {
        state.sub.loading = true;
    },

    notLoading (state) {
        state.sub.loading = false;
    },

    setError (state, error) {
        state.sub.error = error;
    },

    setFieldErrors (state, error) {
        state.sub.fieldErrors = error || {};
    },
    setUploads (state, data){
      state.sub.uploads = data || [];
    },

    setFiles (state, data){
      state.sub.files = data || [];
    },
    resetState (state) {
        state.sub = {
            error: false,
            fieldErrors: {},
            successMsg: 'Project was created successfully.',
            loading: false,
            unauthorized: null,
            unverified: null,
            notfound: false,
        };
    },

    clearErrors (state) {
        state.sub.fieldErrors = false;
        state.sub.error = false;
    },

    clearFieldErrors (state) {
        state.sub.fieldErrors = false;
    },

    setNotFound (state, val) {
        state.sub.notfound = val;
    },

    setVerification (state, val) {
        state.sub.unverified = val;
    },

    isAuthError (state) {
        state.sub.unauthorized = true;
    },

    notAuthError (state) {
        state.sub.unauthorized = false;
    },
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
