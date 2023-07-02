using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace placeholder_scada_back.Migrations
{
    /// <inheritdoc />
    public partial class migration1 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "analog_input",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    description = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    address = table.Column<int>(type: "int", nullable: false),
                    scan_time = table.Column<int>(type: "int", nullable: false),
                    is_on = table.Column<bool>(type: "bit", nullable: false),
                    use_rtu = table.Column<bool>(type: "bit", nullable: false),
                    function = table.Column<int>(type: "int", nullable: false),
                    low_limit = table.Column<float>(type: "real", nullable: false),
                    high_limit = table.Column<float>(type: "real", nullable: false),
                    units = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_analog_input", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "analog_output",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    description = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    address = table.Column<int>(type: "int", nullable: false),
                    initial_value = table.Column<float>(type: "real", nullable: false),
                    low_limit = table.Column<float>(type: "real", nullable: false),
                    high_limit = table.Column<float>(type: "real", nullable: false),
                    units = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_analog_output", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "analog_value",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    tag_id = table.Column<int>(type: "int", nullable: false),
                    value = table.Column<float>(type: "real", nullable: false),
                    date_time = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_analog_value", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "digital_input",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    description = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    address = table.Column<int>(type: "int", nullable: false),
                    scan_time = table.Column<int>(type: "int", nullable: false),
                    is_on = table.Column<bool>(type: "bit", nullable: false),
                    use_rtu = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_digital_input", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "digital_output",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    description = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    address = table.Column<int>(type: "int", nullable: false),
                    initial_value = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_digital_output", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "digital_value",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    tag_id = table.Column<int>(type: "int", nullable: false),
                    value = table.Column<bool>(type: "bit", nullable: false),
                    date_time = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_digital_value", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "real_time_unit",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    is_analog = table.Column<bool>(type: "bit", nullable: false),
                    tag_id = table.Column<int>(type: "int", nullable: false),
                    write_time = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_real_time_unit", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "triggered_alarm",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    time = table.Column<DateTime>(type: "datetime2", nullable: false),
                    tag_value = table.Column<float>(type: "real", nullable: false),
                    alarm_id = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_triggered_alarm", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "user",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    username = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    password = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    role = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_user", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "alarm",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    type = table.Column<int>(type: "int", nullable: false),
                    priority = table.Column<int>(type: "int", nullable: false),
                    tag_id = table.Column<int>(type: "int", nullable: false),
                    threshold = table.Column<float>(type: "real", nullable: false),
                    AnalogInputId = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_alarm", x => x.id);
                    table.ForeignKey(
                        name: "FK_alarm_analog_input_AnalogInputId",
                        column: x => x.AnalogInputId,
                        principalTable: "analog_input",
                        principalColumn: "id");
                });

            migrationBuilder.CreateIndex(
                name: "IX_alarm_AnalogInputId",
                table: "alarm",
                column: "AnalogInputId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "alarm");

            migrationBuilder.DropTable(
                name: "analog_output");

            migrationBuilder.DropTable(
                name: "analog_value");

            migrationBuilder.DropTable(
                name: "digital_input");

            migrationBuilder.DropTable(
                name: "digital_output");

            migrationBuilder.DropTable(
                name: "digital_value");

            migrationBuilder.DropTable(
                name: "real_time_unit");

            migrationBuilder.DropTable(
                name: "triggered_alarm");

            migrationBuilder.DropTable(
                name: "user");

            migrationBuilder.DropTable(
                name: "analog_input");
        }
    }
}
