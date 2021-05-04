module.exports = (app) => {
    
    const getAttendances = async (req, res) => {
        try {
            const query = "Select * from attendance where employeeId = ? order by dateAttendance desc";
            const result = await app.config.connectionDB(query, [req.user.employeeId]);

            return res.status(200).send(result);
        } catch (error) {
            return res.status(500).send(error);
        }
    };

    const postAttendance = async (req, res) => {
        try {

            let query = "Select typeAttendanceId from attendance where employeeId = ? order by dateAttendance desc Limit 1";
            let result = await app.config.connectionDB(query, [req.user.employeeId]);
            let nextTypeRegisterId;

            if (result.length > 0 && result[0].typeRegisterId === 1) {
                nextTypeRegisterId = 2;
            } else {
                nextTypeRegisterId = 1;
            }

            query = "Insert into attendance (employeeId, dateAttendance, typeAttendanceId) values (?, ?, ?)";
            result = app.config.connectionDB(query, [req.user.employeeId, new Date(), nextTypeRegisterId]);
            
            return res.status(201).send("Presença inserida com sucesso!");
                       
        } catch (error) {
            return res.status(500).send(error);
        }
    };

    return { getAttendances, postAttendance }
};