namespace ext;
using { managed } from '@sap/cds/common';

// using an external service from S/4
using {API_BUSINESS_PARTNER as external} from '../srv/external/API_BUSINESS_PARTNER.csn';

entity BusinessPartners as projection on external.A_BusinessPartner {
    key BusinessPartner,
        LastName,
        FirstName
}

using {RMTSAMPLEFLIGHT as es5} from '../srv/external/RMTSAMPLEFLIGHT.csn';

entity Bookings as projection on es5.BookingCollection {
    key carrid as CarrierId,
    key connid as ConnId,
    key fldate as FlightDate,
    key bookid as BookingID,
        PASSNAME as PassengerName
}