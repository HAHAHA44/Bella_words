import chapter5_1 from "../assets/5-1.csv?raw";
import Papa from "papaparse";

export const listeningAssets = [
  {
    name: "wanglu chapter 5.3 test paper 1",
    items: Papa.parse(chapter5_1).data
  },
  {
    name: "wanglu chapter 5-2",
    items: [],
  }
]