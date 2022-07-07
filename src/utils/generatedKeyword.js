const generatedKeyword = (name) => {
    let arrSearch = []
    let nameStr = name.trim()

    arrSearch = nameStr.split("").filter(word => word !== " ")

    for (let i = 0; i < nameStr.length; i++) {
        if (nameStr[i] === " ") {
            arrSearch = [...arrSearch, nameStr.slice(0, i)]
        }

        if (i === nameStr.length - 1) {
            arrSearch = [...arrSearch, nameStr]
        }
    }

    for (let i = nameStr.length; i > 0; i--) {
        if (nameStr[i] === " ") {
            arrSearch = [...arrSearch, nameStr.slice(i + 1, nameStr.length)]
        }
    }

    return arrSearch
}

export default generatedKeyword
