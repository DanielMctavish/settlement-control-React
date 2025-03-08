export const ReservesArray = [];
export const PersonalTasksArray = [];
export const ProfessionalTasksArray = [];
export const ObjectivesArray = [];

export const initializeDataFromLocalStorage = () => {
    const savedReserves = localStorage.getItem('financialReserves');
    if (savedReserves) {
        const parsedReserves = JSON.parse(savedReserves);
        ReservesArray.length = 0;
        parsedReserves.forEach(reserve => {
            ReservesArray.push(reserve);
        });
    }
    
    const savedPersonalTasks = localStorage.getItem('personalTasks');
    if (savedPersonalTasks) {
        const parsedTasks = JSON.parse(savedPersonalTasks);
        PersonalTasksArray.length = 0;
        parsedTasks.forEach(task => {
            PersonalTasksArray.push(task);
        });
    }
    
    const savedProfessionalTasks = localStorage.getItem('professionalTasks');
    if (savedProfessionalTasks) {
        const parsedTasks = JSON.parse(savedProfessionalTasks);
        ProfessionalTasksArray.length = 0;
        parsedTasks.forEach(task => {
            ProfessionalTasksArray.push(task);
        });
    }
    
    const savedObjectives = localStorage.getItem('objectives');
    if (savedObjectives) {
        const parsedObjectives = JSON.parse(savedObjectives);
        ObjectivesArray.length = 0;
        parsedObjectives.forEach(objective => {
            ObjectivesArray.push(objective);
        });
    }
};

export const saveAllDataToLocalStorage = () => {
    localStorage.setItem('financialReserves', JSON.stringify(ReservesArray));
    localStorage.setItem('personalTasks', JSON.stringify(PersonalTasksArray));
    localStorage.setItem('professionalTasks', JSON.stringify(ProfessionalTasksArray));
    localStorage.setItem('objectives', JSON.stringify(ObjectivesArray));
};






