module.exports = (app) => {

    const getSchedules = async (req, res) => {
        try {
            let query = "Select schedule.scheduleId, schedule.description, schedule.lunchBreak, schedule.normalHours, detailsSchedule.detailsScheduleId, detailsSchedule.description, detailsSchedule.startTime, detailsSchedule.endTime from schedule inner join employeeSchedule on schedule.scheduleId  = employeeSchedule.scheduleId inner join detailsSchedule on schedule.scheduleId = detailsSchedule.scheduleId where employeeSchedule.employeeId = ? order by detailsSchedule.startTime asc";
            let result = await app.config.connectionDB(query, [req.user.employeeId]);

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
                let query = "Insert into schedule (entityId, description, lunchBreak, normalHours) values (?, ?, ?, ?)";
                let result = await app.config.connectionDB(query, [req.user.entityId, req.body.description, req.body.lunchBreak, req.body.normalHours]);
                
                const scheduleId =  result.insertId;

                query = "Insert into detailsSchedule (scheduleId, description, startTime, endTime) values (?, ?, ?, ?)";
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
                const query = "Insert into employeeSchedule (scheduleId, employeeId) values (?, ?)";
                const result = await app.config.connectionDB(query, [req.body.scheduleId, req.body.employeeId]);

                return res.status(201).send("Inserido horário para um funcionário com sucesso!");
            }

        } catch (error) {
            return res.status(500).send(error);
        }
    };

    return { getSchedules, postSchedule, postEmployeeSchedule }
};