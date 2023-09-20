document.addEventListener("DOMContentLoaded", () => {
    // Function to fetch user data from the backend
    const fetchUserData = () => {
        fetch("/users")
            .then((response) => response.json())
            .then((data) => {
                const userDataContainer = document.getElementById("user-data");
                userDataContainer.innerHTML = JSON.stringify(data, null, 2);
            })
            .catch((error) => console.error("Error fetching user data: ", error));
    };

    // Function to fetch schedule data from the backend
    const fetchScheduleData = () => {
        fetch("/schedules")
            .then((response) => response.json())
            .then((data) => {
                const scheduleDataContainer = document.getElementById("schedule-data");
                scheduleDataContainer.innerHTML = JSON.stringify(data, null, 2);
            })
            .catch((error) => console.error("Error fetching schedule data: ", error));
    };

    // Call the fetch functions when the page loads
    fetchUserData();
    fetchScheduleData();
});
