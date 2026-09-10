const TicketService = require("../services/email-service");

const create = async (req , res ) => {
    try {
        console.log(req.body);
        const response = await TicketService.createNotificationTicket(req.body);
        return res.status(201).json({
            success : true ,
            data : response,
            err : {},
            message : "Successfully created notification ticket"

        });
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            data:{},
            err : error,
            message : "unable to create notifiaction service ticket"
        });
        
    }
}



module.exports = {
    create
};