// Imports
const cds = require("@sap/cds");

/**
 *
 * The service implementation with all service handlers
 */


module.exports = cds.service.impl(async function () {

    // Define constants for the Risk and BusinessPartners entities from the risk-service.cds file
    const { BusinessPartners, Bookings } = this.entities;

    // connect to remote service
   const BPsrv = await cds.connect.to("API_BUSINESS_PARTNER");
   const FLsrv = await cds.connect.to("RMTSAMPLEFLIGHT");
  
   /**
    * Event-handler for read-events on the BusinessPartners entity.
    * Each request to the API Business Hub requires the apikey in the header.
    */
   this.on("READ", BusinessPartners, async (req) => {
      
        console.log('Business Partner READ');
    // The API Sandbox returns alot of business partners with empty names.
    // We don't want them in our application
    req.query.where("LastName <> '' and FirstName <> '' ");

      return await BPsrv.transaction(req).send({
         query: req.query,
         headers: {
            apikey: process.env.apikey,
         },
      });
   });

   this.on("READ", Bookings, async (req) => {

        return await FLsrv.transaction(req).send({
            query: req.query,
            headers: {
                Authorization : process.env.es5auth
            },
        });

    });

    this.on('customFunction1', async ({data: {rows}}) => {

        console.log('Custom Function 1');
        var res = [];

        const businessPartners = await this.send({
            query: SELECT.from(BusinessPartners).limit(rows)
        });

        businessPartners.forEach((bp, index) => {
            res.push({
                name: bp.FirstName + ' ' + bp.LastName,
                row: index
            });
        });

        return res;

    });

    this.on('customFunction2', async ({data: {rows}}) => {

        console.log('Custom Function 2');
        var res = [];

        const bookings = await FLsrv.send({
            query: SELECT.from(Bookings).limit(rows),
            headers: {
                Authorization : process.env.es5auth
            }
        });

        bookings.forEach((booking, index) => {
            res.push({
                name: booking.PassengerName,
                row: index
            });
        });

        return res;

    });

});