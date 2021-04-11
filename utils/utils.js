export function extractPropertyArea(raw) {
    // console.log("raw",raw)
    var regExp = RegExp("\\d+")
    return raw.match(regExp)
    // console.log("extract",raw.match(regExp))
}

export function getPropertyType(raw) {
    var property_type
    if (raw === 'RM') {
        property_type = 'Rumah'
    }
    else if (raw === 'AP') {
        property_type = 'Apartement'
    }
    else if (raw === 'TN') {
        property_type = 'Tanah'
    }

    return property_type
}

export function getPropertyStatus(raw) {
    var property_status
    if (raw === 'SW') {
        property_status = 'Sewa'
    }
    else if (raw === 'JL') {
        property_status = 'Jual'
    }

    return property_status
}