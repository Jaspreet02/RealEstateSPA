using System.ComponentModel;

namespace DBHandler
{
    public enum eRole
    {
        Admin = 0,
        Landlord = 1,
        Tenant = 2
    }

    public enum eType
    {
        [Description("Apartment")]
        Apartment = 1,
        [Description("Basement")]
        Basement = 2,
        [Description("Bungalow")]
        Bungalow = 3,
        [Description("Condominium/Condo")]
        Condo = 4,
        [Description("Cottage")]
        Cottage =5,
        [Description("Farm House")]
        Farmhouse = 6,
        [Description("Flat")]
        Flat = 7,
        [Description("Semi Detached")]
        Semi_detached = 8,
        [Description("Single family home")]
        Detached = 9,
        [Description("Town House")]
            Townhouse = 10
    }
}
