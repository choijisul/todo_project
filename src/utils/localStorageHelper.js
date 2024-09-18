class localStorageHelper {
    static saveTodoMap(todoMap) {
        window.localStorage.setItem("todoMap", JSON.stringify(todoMap));
    }

    static loadTodoMap() {
        const savedMap = window.localStorage.getItem("todoMap");
        return savedMap ? JSON.parse(savedMap) : {};
    }
}

export default localStorageHelper;
