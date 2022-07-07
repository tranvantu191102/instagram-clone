function getTime(seconds, nanoseconds) {

    const created = new Date(seconds * 1000 + nanoseconds / 1000000).getTime();
    let periods = {
        year: 365 * 30 * 24 * 60 * 60 * 1000,
        month: 30 * 24 * 60 * 60 * 1000,
        week: 7 * 24 * 60 * 60 * 1000,
        day: 24 * 60 * 60 * 1000,
        hour: 60 * 60 * 1000,
        minute: 60 * 1000,
    };
    let diff = Date.now() - created;

    for (const key in periods) {
        if (diff > periods.week) {
            const month = created.toLocaleString('default', { month: 'long' });
            const day = created.getDate()
            const year = created.getFullYear()
            return `${month} ${day} ${year}`
        }
        if (diff >= periods[key]) {
            let result = Math.floor(diff / periods[key]);
            return `${result} ${(result === 1 ? key : key + "s")} ago`;
        }
    }

    return "Just now";

}

export default getTime
