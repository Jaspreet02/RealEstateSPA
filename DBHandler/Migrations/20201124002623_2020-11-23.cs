using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace DBHandler.Migrations
{
    public partial class _20201123 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<DateTimeOffset>(
                name: "ModifiedAt",
                table: "Type",
                nullable: false,
                defaultValue: new DateTimeOffset(new DateTime(2020, 11, 23, 19, 26, 22, 954, DateTimeKind.Unspecified).AddTicks(914), new TimeSpan(0, -5, 0, 0, 0)),
                oldClrType: typeof(DateTimeOffset),
                oldType: "datetimeoffset",
                oldDefaultValue: new DateTimeOffset(new DateTime(2020, 7, 8, 19, 52, 20, 97, DateTimeKind.Unspecified).AddTicks(6442), new TimeSpan(0, -4, 0, 0, 0)));

            migrationBuilder.AlterColumn<DateTimeOffset>(
                name: "CreatedAt",
                table: "Type",
                nullable: false,
                defaultValue: new DateTimeOffset(new DateTime(2020, 11, 23, 19, 26, 22, 954, DateTimeKind.Unspecified).AddTicks(914), new TimeSpan(0, -5, 0, 0, 0)),
                oldClrType: typeof(DateTimeOffset),
                oldType: "datetimeoffset",
                oldDefaultValue: new DateTimeOffset(new DateTime(2020, 7, 8, 19, 52, 20, 97, DateTimeKind.Unspecified).AddTicks(6442), new TimeSpan(0, -4, 0, 0, 0)));
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<DateTimeOffset>(
                name: "ModifiedAt",
                table: "Type",
                type: "datetimeoffset",
                nullable: false,
                defaultValue: new DateTimeOffset(new DateTime(2020, 7, 8, 19, 52, 20, 97, DateTimeKind.Unspecified).AddTicks(6442), new TimeSpan(0, -4, 0, 0, 0)),
                oldClrType: typeof(DateTimeOffset),
                oldDefaultValue: new DateTimeOffset(new DateTime(2020, 11, 23, 19, 26, 22, 954, DateTimeKind.Unspecified).AddTicks(914), new TimeSpan(0, -5, 0, 0, 0)));

            migrationBuilder.AlterColumn<DateTimeOffset>(
                name: "CreatedAt",
                table: "Type",
                type: "datetimeoffset",
                nullable: false,
                defaultValue: new DateTimeOffset(new DateTime(2020, 7, 8, 19, 52, 20, 97, DateTimeKind.Unspecified).AddTicks(6442), new TimeSpan(0, -4, 0, 0, 0)),
                oldClrType: typeof(DateTimeOffset),
                oldDefaultValue: new DateTimeOffset(new DateTime(2020, 11, 23, 19, 26, 22, 954, DateTimeKind.Unspecified).AddTicks(914), new TimeSpan(0, -5, 0, 0, 0)));
        }
    }
}
