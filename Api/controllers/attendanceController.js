module.exports = (app) => {
    
    const getAllAttendances = async (req, res) => {
        try {
            const query = "Select attendance.attendanceId, attendance.dateAttendance, typeAttendance.description as 'typeAttendance' from attendance inner join typeAttendance on attendance.typeAttendanceId = typeAttendance.typeAttendanceId where attendance.employeeId = ? order by dateAttendance desc";
            const result = await app.config.connectionDB(query, [req.user.employeeId]);

            return res.status(200).send(result);
        } catch (error) {
            return res.status(500).send(error);
        }
    };

    const getDateAttendances = async (req, res) => {
        try {            
            const query = "Select attendance.attendanceId, attendance.dateAttendance, typeAttendance.description as 'typeAttendance' from attendance inner join typeAttendance on attendance.typeAttendanceId = typeAttendance.typeAttendanceId where attendance.dateAttendance >= ? And attendance.dateAttendance <= ? And attendance.employeeId = ? order by dateAttendance desc"; 
            const result = await app.config.connectionDB(query, [req.query.initialDate, req.query.finalDate, req.user.employeeId]);
        
            return res.status(200).send(result);
        } catch (error) {
            return res.status(500).send(error);
        }
    };

    const postAttendance = async (req, res) => {
        try {

            let query = "Select typeAttendanceId from attendance where employeeId = ? order by dateAttendance desc Limit 1";
            let result = await app.config.connectionDB(query, [req.user.employeeId]);
            let nextTypeAttendanceId;

            if (result.length > 0 && result[0].typeAttendanceId === 1) {
                nextTypeAttendanceId = 2;
            } else {
                nextTypeAttendanceId = 1;
            }

            query = "Insert into attendance (employeeId, dateAttendance, typeAttendanceId) values (?, ?, ?)";
            result = app.config.connectionDB(query, [req.user.employeeId, new Date(), nextTypeAttendanceId]);
            
            return res.status(201).send(`${nextTypeAttendanceId === 1 ? "Entrada" : "Saída"} registada com sucesso!`);
                       
        } catch (error) {
            return res.status(500).send(error);
        }
    };

    return { getAllAttendances, getDateAttendances, postAttendance }
};