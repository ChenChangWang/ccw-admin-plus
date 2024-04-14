export type HandleType = "forward" | "backward" | "set";

export interface SubmitData {
  payAccount: string;
  receiverMode: string;
  receiverAccount: string;
  receiverName: string;
  amount: number;
}
