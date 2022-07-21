using { ext } from '../db/schema';
@path: 'service/ext'
service External {

    @readonly entity BusinessPartners as projection on ext.BusinessPartners;

    @readonly entity Bookings as projection on ext.Bookings;
    
    // Custom Function Import
    type customType {
        name: String;
        row: Integer;
    }
    function customFunction1(rows: Integer) returns Array of customType;

    // Custom Function Import with API Call from SAP API Business Hub
    function customFunction2(rows: Integer) returns Array of customType;
    
}