// MODIFY BELOW VARIABLES TO CUSTOMISE
/*

 WIDTH
  <->
 _____
/     \
▏     ▕       
▏     ▕  ^
▏     ▕  | Height
┕┒    ▕  ⌄ 
 ▕____▕ 

*/

WEMOS_WIDTH = 25;
WEMOS_HEIGHT = 35;
WEMOS_THICKNESS = 1;
WEMOS_WIFI_THICKNESS = 1;
WEMOS_USB_THICKNESS = 2.5;

USB_CABLE_WIDTH = 8;
USB_CABLE_HEIGHT = 3;


/*
 WIDTH
  <->
_______
▏_____ ▏ ^      
▏▏OLED▏▏ | Height
▏▏___▕▕  ⌄
┕┒_____▏  

*/

OLED_WIDTH = 26;
OLED_HEIGHT = 28;
OLED_THICKNESS = 1.3;
DISPLAY_OFFSET_X = 8;
DISPLAY_WIDTH = 14;
DISPLAY_HEIGHT = 10;
DISPLAY_OFFSET_Y = 5;


/*
 WIDTH
  <->
 _______  ^
 ▏○   ◠ ▏ | Height
▕_______▏ ⌄    
SCL -> D1
SDA -> D2

*/
CO2_WIDTH = 24;
CO2_HEIGHT = 19;
CO2_THICKNESS = 1.3;
CO2_OFFSET_LEFT_ENS160 = 7;
CO2_OFFSET_BOTTOM_ENS160 = 12.5;
CO2_ENS160_SIZE = 3;
CO2_COMP_HEIGHT = 1;
CO2_COMP_OFFSET_RIGHT = 3;

CO2_OFFSET_LEFT_AHT21= 16.5;
CO2_OFFSET_BOTTOM_AHT21 = 11.5;
CO2_AHT21_SIZE = 3.5;


/*
           X
          <->
        ________     ^
Y /    /       /|    | Z
 /    /_______/ |    ⌄ 
      |       | /
      |_______|/
*/
BOX_X = WEMOS_HEIGHT;
BOX_Y = 36;
BOX_Z = 30;
WALL_THICKNESS = 1.2;

BOX_X_OUTER = BOX_X + 2 * WALL_THICKNESS;
BOX_Y_OUTER = BOX_Y + 2 * WALL_THICKNESS;
BOX_Z_OUTER = BOX_Z + 2 * WALL_THICKNESS;

BOX_Z_DIFF_MIDDLE2TOP = 15;
BOX_Z_MIDDLE = BOX_Z / 2 + WALL_THICKNESS;

module txt() {
    linear_extrude(WALL_THICKNESS)
        text("CO");
    translate([20, -2, 0])
        linear_extrude(WALL_THICKNESS)
            scale([0.5, 0.5, 1])
                text("2");
}

module box() {
    union() {
        difference() {
            // OUTER BOX
            translate([-WALL_THICKNESS, -WALL_THICKNESS, -WALL_THICKNESS])
                scale([BOX_X_OUTER, BOX_Y_OUTER, BOX_Z_OUTER])
                    cube(1);
            // INNER BOX
            translate([0, -WALL_THICKNESS-0.1, 0])
                scale([BOX_X,BOX_Y+0.1,BOX_Z])
                    cube(1);
            // USB Hole
            translate([BOX_X-0.1, BOX_Y - WEMOS_WIDTH / 2 - USB_CABLE_WIDTH / 2, BOX_Z - BOX_Z_DIFF_MIDDLE2TOP ])
                scale([WALL_THICKNESS+0.2, USB_CABLE_WIDTH, USB_CABLE_HEIGHT])
                    cube(1);
            // DISPLAY HOLE
            translate([DISPLAY_OFFSET_X, BOX_Y - DISPLAY_OFFSET_Y - DISPLAY_WIDTH, BOX_Z - 0.1])
                scale([DISPLAY_HEIGHT, DISPLAY_WIDTH, WALL_THICKNESS + 0.2])
                    cube(1);
            translate([DISPLAY_OFFSET_X + DISPLAY_HEIGHT + 13, 12, BOX_Z_OUTER - 1.25 * WALL_THICKNESS])
                rotate([0,0,90])
                    scale([0.8, 0.8, 1])
                        txt();
            
        }
        // WIFI-SIDE
        translate([0, 0, BOX_Z - BOX_Z_DIFF_MIDDLE2TOP])
            scale([2, BOX_Y, 2])
                cube(1);
        // USB-SIDE
        translate([BOX_X - WALL_THICKNESS, 0, BOX_Z - BOX_Z_DIFF_MIDDLE2TOP - WEMOS_USB_THICKNESS])
            scale([2, BOX_Y, 2])
                cube(1);
    }
}

module cap() {
    difference() {
        union() {
            // BASE
            translate([-WALL_THICKNESS, -WALL_THICKNESS, -WALL_THICKNESS])
                scale([BOX_X_OUTER, WALL_THICKNESS, BOX_Z_OUTER])
                    cube(1);
            // INSET
            translate([0, 0, 0])
                scale([BOX_X, WALL_THICKNESS, BOX_Z])
                    cube(1);
            // HOLDER LEFT
            translate([DISPLAY_OFFSET_X - WALL_THICKNESS, WALL_THICKNESS, WALL_THICKNESS])
                scale([WALL_THICKNESS, CO2_THICKNESS + WALL_THICKNESS, CO2_HEIGHT])
                    cube(1);
            
            // HOLDER RIGHT
            translate([DISPLAY_OFFSET_X + CO2_WIDTH, WALL_THICKNESS, WALL_THICKNESS])
                scale([WALL_THICKNESS, CO2_THICKNESS + WALL_THICKNESS, CO2_HEIGHT])
                    cube(1);

            // HOLDER BOTTOM
            translate([DISPLAY_OFFSET_X-WALL_THICKNESS, WALL_THICKNESS, 0])
                scale([CO2_WIDTH+2*WALL_THICKNESS, CO2_THICKNESS + WALL_THICKNESS, WALL_THICKNESS])
                    cube(1);
            
            // HOLDER TOP
            translate([DISPLAY_OFFSET_X-WALL_THICKNESS, CO2_THICKNESS + WALL_THICKNESS, 0])
                scale([CO2_WIDTH+2*WALL_THICKNESS, WALL_THICKNESS, CO2_HEIGHT + WALL_THICKNESS])
                    cube(1);
        }
        // AHT21
        translate([DISPLAY_OFFSET_X + CO2_OFFSET_LEFT_AHT21,-2*WALL_THICKNESS,WALL_THICKNESS + CO2_OFFSET_BOTTOM_AHT21])
            scale([CO2_AHT21_SIZE, 4 * WALL_THICKNESS, CO2_AHT21_SIZE])
                cube(1);
        
        translate([DISPLAY_OFFSET_X + CO2_OFFSET_LEFT_AHT21 + CO2_AHT21_SIZE / 2,-WALL_THICKNESS-0.01, WALL_THICKNESS + CO2_OFFSET_BOTTOM_AHT21 + CO2_AHT21_SIZE / 2])        
            rotate([-90, 0, 0])
                rotate([0,0,45])
                    cylinder(h=WALL_THICKNESS,r1=2*CO2_AHT21_SIZE,r2=CO2_AHT21_SIZE / sqrt(2),$fn=4);

        // ENS160
        translate([DISPLAY_OFFSET_X + CO2_OFFSET_LEFT_ENS160,-2*WALL_THICKNESS,WALL_THICKNESS + CO2_OFFSET_BOTTOM_ENS160])
            scale([CO2_ENS160_SIZE, 4 * WALL_THICKNESS, CO2_ENS160_SIZE])
                cube(1);
        translate([DISPLAY_OFFSET_X + CO2_OFFSET_LEFT_ENS160 + CO2_ENS160_SIZE / 2,-WALL_THICKNESS-0.01, WALL_THICKNESS + CO2_OFFSET_BOTTOM_ENS160 + CO2_ENS160_SIZE / 2])        
            rotate([-90, 0, 0])
                rotate([0,0,45])
                    cylinder(h=WALL_THICKNESS,r1=2*CO2_ENS160_SIZE,r2=CO2_ENS160_SIZE / sqrt(2),$fn=4);

        // SPARE PLACE FOR COMPONENTS
        translate([DISPLAY_OFFSET_X, WALL_THICKNESS - CO2_COMP_HEIGHT, WALL_THICKNESS])
            scale([CO2_WIDTH - CO2_COMP_OFFSET_RIGHT, CO2_COMP_HEIGHT + 0.1, BOX_Z])
                cube(1);
        // REMOVE PART OF CO2 HOLDER TOP
        translate([DISPLAY_OFFSET_X + WALL_THICKNESS, WALL_THICKNESS, WALL_THICKNESS])
            scale([CO2_WIDTH-2*WALL_THICKNESS, 3*WALL_THICKNESS, CO2_HEIGHT])
                cube(1);
    }
}

translate([BOX_X_OUTER + 10, 0, 0]) // translate where you want it
    rotate([270, 0, 0]) // 2: rotate
        translate([WALL_THICKNESS, -BOX_Y_OUTER + WALL_THICKNESS, WALL_THICKNESS]) // 1. bring to origin 
            box();


translate([0, BOX_Z_OUTER, 0]) // 3. translate where you want it
    rotate([90, 0, 0]) // 2. rotate
        translate([WALL_THICKNESS,WALL_THICKNESS,WALL_THICKNESS]) // 1. bring to origin
            cap();


// cap();
// box();
// txt();
