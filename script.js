const getWorkingDays = async () => {
    const nationalHolidayObject = await (await fetch("https://holidays-jp.github.io/api/v1/date.json")).json();
    const nationalHolidays = Object.keys(nationalHolidayObject);
    const today = new Date();
    const thisYear = today.getFullYear();
    const thisMonthIndex = today.getMonth();
    const lastDayOfThisMonth = new Date(thisYear, thisMonthIndex, 0);
    const days = lastDayOfThisMonth.getDate();
    const sundayIndex = 0;
    const saturdayIndex = 6;
    let day;
    let dayString;
    let weekend;
    let holiday;
    let workingDays = 0;
    for (let i = 1; i <= days; i++) {
        day = new Date(thisYear, thisMonthIndex, i);
        dayString = `${day.getFullYear()}-${(day.getMonth() + 1).toString().padStart(2, "0")}-${day.getDate().toString().padStart(2, "0")}`;
        weekend = [sundayIndex, saturdayIndex].includes(day.getDay());
        holiday = nationalHolidays.includes(dayString);
        if (weekend === false && holiday === false) {
            workingDays++;
        }
    }
    msg.textContent = String(workingDays);
}

getWorkingDays();
