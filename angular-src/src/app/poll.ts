export interface Poll{
  _id: String;
  name: String;
  created_by: String;
  votes: Array<Number>;
  options: Array<String>;
}