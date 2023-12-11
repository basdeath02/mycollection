import { createStore } from 'vuex'

const store = createStore({
    state() {
        return {
            isLoading: false,
            error: {
                status: false,
                message: ""
            },
            success: {
                status: false,
                message: "",
                isCallback: true,
                callback: () => { }
            },
            leftBar: {
                showLeftBar: false,
                selectedParentMenu: null,
                selectedMenu: ""
            },
            levelPathList: []
        }
    },
    mutations: {
        setLoading(state, { loading }) {
            if (!state.success.status && !state.error.status) {
                state.isLoading = loading
            }
        },
        setErrorModal(state, { status = true, message = "" }) {
            if (!state.isLoading && !state.success.status) {
                state.error = {
                    status: status,
                    message: message
                }
            }
        },
        setSuccessModal(state, { status = true, message = 'Success', isCallback = true, callback = () => { } }) {
            if (!state.isLoading && !state.error.status) {
                state.success = {
                    status: status,
                    message: message,
                    isCallback: isCallback,
                    callback: callback
                }
            }
        },
        setShowLeftBar(state) {
            state.leftBar.showLeftBar = !state.leftBar.showLeftBar
        },
        setSelectedParentMenu(state, { parentName }) {
            state.leftBar.selectedParentMenu = parentName;
        },
        setSelectedMenu(state, { menuPath }) {
            state.leftBar.selectedMenu = menuPath;
        },
        setLevelList(state, { level = 0, pathName, path, isCurrent = true }) {
            let levelData = {
                level: level,
                pathName: pathName,
                path: path,
                isCurrent: isCurrent
            }
            if (level == 0) {
                sessionStorage.removeItem('levelPathList')
                state.levelPathList = []
                state.levelPathList.push(levelData)
                sessionStorage.setItem('levelPathList', JSON.stringify(state.levelPathList))
                sessionStorage.setItem("selectedMenu", path);
            } else {
                state.levelPathList = JSON.parse(sessionStorage.getItem('levelPathList')) || []
                state.levelPathList = state.levelPathList.filter((levelPath) => levelPath.level < level)
                if (state.levelPathList.findIndex((levelPath) => levelPath.pathName == pathName) == -1) {
                    state.levelPathList.push(levelData)
                    if (isCurrent) {
                        state.levelPathList.forEach((levelPath) => {
                            if (levelPath.pathName != pathName) {
                                levelPath.isCurrent = false
                            }
                        })
                    }
                }
                sessionStorage.setItem('levelPathList', JSON.stringify(state.levelPathList))
            }
            state.levelPathList.sort((a, b) => {
                return a.level - b.level;
            })
        }
    }
})

export default store