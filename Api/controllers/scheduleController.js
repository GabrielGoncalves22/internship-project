module.exports = (app) => {
    let query, result;

    const getAllSchedules = async (req, res) => {
        try {
            query = "Select schedules.scheduleId, schedules.description, schedules.lunchBreak, schedules.normalHours, detailsSchedules.detailsScheduleId, detailsSchedules.description, detailsSchedules.startTime, detailsSchedules.endTime, employees.employeeId, employees.name from schedules inner join employeesSchedules on schedules.scheduleId  = employeesSchedules.scheduleId inner join detailsSchedules on schedules.scheduleId = detailsSchedules.scheduleId inner join employees on employees.employeeId = employeesSchedules.employeeId where employees.entityId = ? order by employees.employeeId asc, detailsSchedules.startTime asc";
            result = await app.config.connectionDB(query, [req.user.entityId]);

            return res.status(200).send(result);

        } catch (error) {
            return res.status(500).send(error);
        }
    };

    const getSchedules = async (req, res) => {
        try {
            query = "Select schedules.scheduleId, schedules.description, schedules.lunchBreak, schedules.normalHours, detailsSchedules.detailsScheduleId, detailsSchedules.description, detailsSchedules.startTime, detailsSchedules.endTime from schedules inner join employeesSchedules on schedules.scheduleId  = employeesSchedules.scheduleId inner join detailsSchedules on schedules.scheduleId = detailsSchedules.scheduleId where employeesSchedules.employeeId = ? order by detailsSchedules.startTime asc";
            result = await app.config.connectionDB(query, [req.user.employeeId]);

            return res.status(200).send(result);

        } catch (error) {
            return res.status(500).send(error);
        }
    };

    const postSchedule = async (req, res) => {
        try {
            if (!req.body.lunchBreak || !req.body.normalHours || !req.body.details) {
                return res.status(400).send("Dados incompletos!");
            } else {
                query = "Insert into schedules (entityId, description, lunchBreak, normalHours) values (?, ?, ?, ?)";
                result = await app.config.connectionDB(query, [req.user.entityId, req.body.description, req.body.lunchBreak, req.body.normalHours]);
                
                const scheduleId =  result.insertId;

                query = "Insert into detailsSchedules (scheduleId, description, startTime, endTime) values (?, ?, ?, ?)";
                for (let i = 0; i < req.body.details.length; i++) {
                    result = await app.config.connectionDB(query, [scheduleId, req.body.details[i].description, req.body.details[i].startTime, req.body.details[i].endTime]);
                }

                return res.status(201).send("Horário inserido com sucesso!");
            }  
        } catch (error) {
            return res.status(500).send(error);
        }
    };

    const postEmployeeSchedule =  async (req, res) => {
        try {
            if (!req.body.scheduleId || !req.body.employeeId) {
                return res.status(400).send("Dados incompletos!");
            } else {
                query = "Insert into employeesSchedules (scheduleId, employeeId) values (?, ?)";
                await app.config.connectionDB(query, [req.body.scheduleId, req.body.employeeId]);

                return res.status(201).send("Inserido horário para um funcionário com sucesso!");
            }

        } catch (error) {
            return res.status(500).send(error);
        }
    };

    return { getAllSchedules, getSchedules, postSchedule, postEmployeeSchedule }
};