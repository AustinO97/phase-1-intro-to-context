const createEmployeeRecord = (arr) => {
    return {
        firstName: arr[0],
        familyName: arr[1],
        title: arr[2],
        payPerHour: arr[3],
        timeInEvents: [],
        timeOutEvents: []
    }
}

const createEmployeeRecords = (employeeRecords) => {
    return employeeRecords.map((arr) => {
        return createEmployeeRecord(arr)
    })
}

const createTimeInEvent = (employeeRecord, dateStamp) => {
    const timeInEvent = {
        type: "TimeIn",
        hour: parseInt(dateStamp.slice(-4)),
        date: dateStamp.slice(0, 10),
    }
    employeeRecord.timeInEvents.push(timeInEvent)
    return employeeRecord;
}

const createTimeOutEvent = (employeeRecord, dateStamp) => {
    const timeOutEvent = {
        type: "TimeOut",
        hour: parseInt(dateStamp.slice(-4)),
        date: dateStamp.slice(0, 10),
    }
    employeeRecord.timeOutEvents.push(timeOutEvent)
    return employeeRecord;
}

const hoursWorkedOnDate = (employeeRecord, dateStamp) => {
    const timeIn = employeeRecord.timeInEvents.find(e => e.date === dateStamp)
    const timeOut = employeeRecord.timeOutEvents.find(e => e.date === dateStamp)
    return (timeOut.hour - timeIn.hour) / 100;
}

const wagesEarnedOnDate = (employeeRecord, dateStamp) => {
    return hoursWorkedOnDate(employeeRecord, dateStamp) * employeeRecord.payPerHour;
}

const allWagesFor = (employeeRecord) => {
    const allWages = employeeRecord.timeInEvents.map(e => wagesEarnedOnDate(employeeRecord, e.date))
    return allWages.reduce((total, wage) => total + wage)
}

const calculatePayroll = (employeeRecord) => {
    const payOwed = employeeRecord.map(record => allWagesFor(record))
    return payOwed.reduce((total, employeeTotal) => total + employeeTotal)
}

