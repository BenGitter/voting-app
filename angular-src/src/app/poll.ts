export interface Poll{
  _id: string;
  name: string;
  created_by: string;
  votes: Array<number>;
  options: Array<string>;
}