﻿using System.ComponentModel;
using System.Reflection;

namespace DBHandler
{
   public static  class EnumHelper
    {
        public static string GetEnumDescription(eType value)
        {
            FieldInfo fi = value.GetType().GetField(value.ToString());

            DescriptionAttribute[] attributes =
                (DescriptionAttribute[])fi.GetCustomAttributes(
                typeof(DescriptionAttribute),
                false);

            if (attributes != null &&
                attributes.Length > 0)
                return attributes[0].Description;
            else
                return value.ToString();
        }

        //public string GetEnumDescription(EmailKeyword item)
        //{
        //    throw new NotImplementedException();
        //}
    }
}
