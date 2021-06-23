package com.company;
import java.util.*;

public class Main {

    public static void main(String[] args) {
        Scanner in = new Scanner(System.in);
        int sum =0;
        for(int i =0;i<200;i++) {
            System.out.print("Input");
            int input = in.nextInt();
            sum = sum + input;
            System.out.println("Sum" + sum);

        }
    }
}
