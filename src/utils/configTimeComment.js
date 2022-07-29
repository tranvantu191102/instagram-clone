function configTimeComment(seconds, nanoseconds) {

    const created = new Date(seconds * 1000 + nanoseconds / 1000000).getTime()
    let periods = {
        y: 365 * 30 * 24 * 60 * 60 * 1000,
        m: 30 * 24 * 60 * 60 * 1000,
        w: 7 * 24 * 60 * 60 * 1000,
        d: 24 * 60 * 60 * 1000,
        h: 60 * 60 * 1000,
        s: 60 * 1000,
    };
    let diff = Date.now() - created;


    for (const key in periods) {
        if (diff >= periods[key]) {
            let result = Math.floor(diff / periods[key]);
            return `${result + key}`;
        }
    }

    return "Just now";

}

export default configTimeComment
