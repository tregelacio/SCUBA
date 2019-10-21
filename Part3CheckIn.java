/***ICS414 Team Waimea Bay
*Scuba part 3
*Nathan Onaka, Tre Jordan Gelacio
***/

import java.util.*;

class Main {
  public static void main(String[] args) {
    System.out.println("Welcome to SCUBA!  - Team Waimea Bay \n");
    System.out.println("!!WARNING: THIS IS NOT A FUNCTIONAL DIVE PLANNER AND SHOULD NOT BE USED TO PLAN ANY REAL DIVES!! \n \n");

    Scanner scan = new Scanner(System.in);
    System.out.println("Please input current dive depth in meters.");
    double diveDepth = scan.nextDouble();

    System.out.println("Please input current dive time in minutes.");
    int diveTime = scan.nextInt();

    System.out.println("~~~~~~~~~~~~~~~~~~Scuba Dive Info~~~~~~~~~~~~~~~~~~");
    System.out.print("Depth: ");
    System.out.print(String.valueOf(diveDepth) + " m");
    System.out.print("                   Time: ");
    System.out.print(String.valueOf(diveTime) + " min \n");
    System.out.println("__________________________________________________");
    System.out.print("Pressure: ");
    System.out.print(String.valueOf(pressure(diveDepth)) + " atm \n");
    System.out.print("Temperature: ");
    System.out.print(temperature(diveDepth) + "\n");
    System.out.print("Oxygen Left: ");
    System.out.print(String.valueOf(oxygen(diveDepth)) + " min \n");
    System.out.print(decompressionStops(diveDepth));
  }

  public static double pressure(double depth){
    //Pressure calculated by using density of seawater at 1025 kg/m^3 * depth(m) * gravity(m/s^2) = current pressure in Pascal's.  Convert to atm's and then add +1 atm for for sealevel.
    return (depth * 1025 * 9.8)/(101325) + 1;
  }

  public static String temperature(double depth){
    //Between ocean surface and 100m ocean temp stays relatively consistent, until 500m where it starts to drop
    if(depth <= 0.0){
      return "Depth cannot be negative";
    }
    if(depth <= 100.0){
      return "75 Degrees F";
    }
    if(depth <= 200.0){
      return "73 Degrees F";
    }
    if(depth <= 300.0){
      return "71 Degrees F";
    }
    if(depth <= 400.0){
      return "69 Degrees F";
    }
    else
      return "This is not an feasible scuba diving depth";

  }

  public static double oxygen(double depth){
    //Calculated using average 12L(200bar) oxygen tank, and 1.5 bar/minute SAC(Surface Air Consumption) rate.
    //depth air consumption rate
    double dac = 1.5 * pressure(depth);
    //Always keep 1/4 of your oxygen for ascent so assuming 50bar left in tank
    return 150 / dac;
  }

  public static String decompressionStops(double depth){
    if(depth <= 0.0){
      return "Depth cannot be negative";
    }
    if(depth <= 5.0){
      return "No decompression stops needed";
    }
    if(depth <= 10.0){
      return "3 min decompression stop needed at 5m";
    }
    if(depth >= 10.0){
      return "3 min decompression stops will be needed every 10m";
    }
    else 
      return "This is not an feasible scuba diving depth";
  }
}