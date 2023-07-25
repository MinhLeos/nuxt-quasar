<template>
  <div class="mx-40 my-40 text-3xl text-orange-300">TypeScript</div>
</template>

<script setup lang="ts">
useHead({
  title: "TypeScript",
});
const add = (a: number, b: number) => {
  return a + b;
};
const num1 = 1;
const num2 = 2;
const result = add(num1, num2);

const object: {
  name: string;
  age: number;
} = {
  name: "John",
  age: 18,
};

const arr: string[] = ["ab", "1"];

const user: {
  name: string;
  age: number;
  role: [number, string];
} = {
  name: "John",
  age: 18,
  role: [1, "admin"],
};

// thay vì dùng
/*
    const ADMIN = 0;
    const GUEST = 1;
*/
enum Role {
  ADMIN,
  GUEST,
}
console.log(Role.ADMIN); // Kết Quả : 0

enum Role1 {
  ADMIN = 10,
  GUEST,
}
console.log(Role1.ADMIN); // Kết Quả : 10
console.log(Role1.GUEST); // Kết Quả : 11

enum Role2 {
  ADMIN = "User is Admin",
  GUEST = "User is Guest",
}
console.log(Role2.ADMIN); // Kết Quả : 'User is Admin'

let anyType: any;
anyType = 1;
anyType = "String";

// Union Types
const combine = (input1: number | string, input2: number | string) => {
  if (typeof input1 === "number" && typeof input2 === "number") {
    return input1 + input2;
  }
  return input1.toString() + " " + input2.toString();
};
const combineAge = combine(20, 30);
console.log("combineAge", combineAge);

const combineName = combine("Minh", "Le");
console.log("combineName", combineName);

//Literal Types
const combineNew = (
  input1: number | string,
  input2: number | string,
  resultType: "number" | "string"
) => {
  if (resultType === "number") {
    return +input1 + +input2;
  }
  return input1.toString() + " " + input2.toString();
};

const combineNewAge = combineNew(20, 40, "number");
console.log("combineNewAge", combineNewAge);

//Alias
type Combinable = number | string;
const combineAlias = (
  input1: Combinable,
  input2: Combinable,
  resultType: "number" | "string"
) => {
  if (resultType === "number") {
    return +input1 + +input2;
  }
  return input1.toString() + " " + input2.toString();
};
const combineAliasAge = combineAlias(20, 40, "number");
console.log("combineAliasAge", combineAliasAge);

// thay vì dùng
/*
function greet(user: { name: string; age: number }) {
  console.log('Hi, I am ' + user.name);
}

function isOlder(user: { name: string; age: number }, checkAge: number) {
  return checkAge > user.age;
}
*/
type User = { name: string; age: number };

function greet(user: User) {
  console.log("Hi, I am " + user.name);
}

function isOlder(user: User, checkAge: number) {
  return checkAge > user.age;
}

//Function as type
const sum = (n1: number, n2: number) => {
  return n1 + n2;
};
let func: (n1: number, n2: number) => number;
func = sum;

const printNumber = (n: number) => {
  console.log("Number: ", n);
};
//func = printNumber; //Error

function addHandle(a: number, b: number, cb: (n: number) => void) {
  const result = a + b;
  cb(result);
}
addHandle(10, 15, printNumber);

//Interface
interface Person {
  //Properties
  name: string;
  age: number;

  //Method
  greet(name: string): void;
}

interface Student {
  name: string;
  age: number;
}

function test(name: string, age: number): Student {
  return {
    name,
    age,
  };
}

//Interface as Function types
// type AddFn = (a: number, b: number) => number;
interface AddFn {
  (a: number, b: number): number;
}

let addFunc: AddFn;
addFunc = (a: number, b: number) => a + b;

//Interface có thể merge còn type thì không
interface Shape {
  name: string;
}
interface Shape {
  color: string;
}
const Circle: Shape = {
  name: "circle",
  color: "blue",
};

// type ShapeType = {
//    name: string;
// }

// type ShapeType = {
//   color:string;
// }

//Type có thể sử dụng được với “Computed properties” còn Interface thì không
type keysType = "color" | "name";
type ShapeType = {
  [key in keysType]: string;
};
const CircleType: ShapeType = {
  name: "circle",
  color: "res",
};

// type keys = "color" | "name";
// interface ShapeI {
//   [key in keys]: string;
// }
// const CircleI: ShapeI = {
//   name: "circle",
//   color: "res",
// };

//optional properties
interface CircleConfig {
  color?: string;
  radius?: number;
  diameter?: number;
}
let circle: CircleConfig = { color: "black", radius: 150 };

//Readonly
interface Point {
  readonly x: number;
  readonly y: number;
}
let p1: Point = { x: 10, y: 20 };
//p1.x = 5; // error!

interface StringArray {
  [index: number]: string;
}

let myName: StringArray;
myName = ["Tôi", "là", "Nguyễn", "Văn", "A"];

let myStr: string = myName[0];
console.log("myStr", myStr);

interface Demo {
  color: string;
}
interface Demo2 {
  penWidth: number;
}
interface Test extends Demo, Demo2 {
  height: number;
}
let demo: Test = {
  color: "red",
  penWidth: 10,
  height: 10,
};

//Intersection Type
type Admin = {
  name: string;
  privileges: string[];
};
type Employee = {
  name: string;
  startDate: Date;
};
type ElevatedEmployee = Admin & Employee;
let ee: ElevatedEmployee = {
  name: "John",
  privileges: ["create"],
  startDate: new Date(),
};

type CombinableType = number | string;
type Numeric = boolean | number;
type Universal = CombinableType & Numeric;
let uni: Universal = 1; // let uni: Universal = 'a'; // Error

//Type Guard
type UnknowEmployee = Admin | Employee;
function printInfo(emp: UnknowEmployee) {
  console.log("Name: ", emp.name);
  if ("privileges" in emp) {
    console.log("privileges", emp.privileges);
  }
}

//Index Properties >>> Không cần biết trước tên thuộc tính và số lượng thuộc tính
interface ErrorContainer {
  [prop: string]: string;
}
const err: ErrorContainer = {
  email: "Not a valid email!",
};
err.password = "Password must be more than 8 characters!";
console.log("---", Object.keys(err));

//Generic
//Built-in generic

const listData: Array<string | number> = [];
const promise: Promise<number | string> = new Promise((res, rej) => {
  const random = Math.random();
  if (random > 0.5) {
    res("123");
  } else {
    rej("Have an error!");
  }
});
promise
  .then((data) => {
    console.log("data", data);
    return data;
  })
  .catch((err) => {
    console.error("error", err);
  });

//Generic Function

function merge(objA: object, objB: object) {
  //....
  return Object.assign(objA, objB);
}
const mergeObj = merge({ name: "Minh" }, { age: 18 });
//console.log(mergeObj.name); //Error

//Khắc phục bằng cách dùng generic function ( có dùng generic constraint)
function merge2<T extends object, U extends object>(objA: T, objB: U) {
  //....
  return Object.assign(objA, objB);
}
const mergeObj2 = merge2({ name: "Minh" }, { age: 18 });
console.log(mergeObj2.name);
const mergeObj3 = merge2({ firstName: "Minh" }, { lastName: 18 });
console.log(mergeObj3.firstName, mergeObj3.lastName);

const mergeObj34 = merge2({ firstName: "Minh" }, 1);

// function identity<Type>(arg: Type): Type {
//   return arg;
// }
// identity<number>(1);
// identity<string>("1");

//thêm ví dụ về generic funtion ( có dùng generic constraint)
interface Lengthy {
  length: number;
}
function countAndDescribe<T extends Lengthy>(ele: T): [T, string] {
  let des = "No value!";
  if (ele.length === 1) {
    des = "Have 1 element!";
  } else if (ele.length > 1) {
    des = "Have " + ele.length + " elements!";
  }
  return [ele, des];
}
console.log(countAndDescribe("123"));
console.log(countAndDescribe([1, 2]));

//Generic Interface
interface GenericIdentityFn<Type> {
  (arg: Type): Type;
}

function identity<Type>(arg: Type): Type {
  return arg;
}

let myIdentity: GenericIdentityFn<string> = identity;
myIdentity("123");
//myIdentity(123); //Error

//Generic class

class DataStorage<T> {
  private data: T[] = [];

  addItem(item: T) {
    this.data.push(item);
  }
  removeItem(item: T) {
    const idx = this.data.indexOf(item);
    if (idx === -1) return;
    this.data.splice(idx, 1);
  }
  getListItems() {
    return [...this.data];
  }
}

const stringStorage = new DataStorage<string>();
stringStorage.addItem("123");
//stringStorage.addItem(123); //Error

const objectStorage = new DataStorage<object>();
objectStorage.addItem({ name: "Minh" });
objectStorage.addItem([1, 2, 3]);
// objectStorage.addItem('123'); //Error

const numberAndStringStorage = new DataStorage<number | string>();
numberAndStringStorage.addItem(123);
numberAndStringStorage.addItem("123");

//Generic Utility types
interface CourseGoal {
  title: string;
  description: string;
  completeUntil: Date;
}

function createCourseGoal(
  title: string,
  description: string,
  date: Date
): CourseGoal {
  let courseGoal: Partial<CourseGoal> = {};
  courseGoal.title = title;
  courseGoal.description = description;
  courseGoal.completeUntil = date;
  return courseGoal as CourseGoal;
}

const listName: Readonly<string[]> = ["Minh", "Le"];
//listName.pop(); //Error
//listName.push("John"); //Error

const listDatas: ReadonlyArray<string> = ["123", "456"];
//listDatas.pop(); //Error
//listDatas.push("789"); //Error

// keyof type
type PointKeyof = { x: number; y: number };
type P = keyof PointKeyof; // Plà cùng loại với type P = "x" | "y"

let p: P = "x";
let p2: P = "y";
//let p3: P = 'a'; //Error

type Arrayish = { [n: number]: unknown };
type A = keyof Arrayish;
type Mapish = { [k: string]: unknown };
type M = keyof Mapish;

function extractAndConvert<T extends object, U extends keyof T>(
  obj: T,
  key: U
) {
  return "Value: " + obj[key];
}
const ext1 = extractAndConvert({ name: "Minh" }, "name");
console.log(ext1);
const ext2 = extractAndConvert({ name: "Minh", age: 18 }, "age");
console.log(ext2);
//const ext3 = extractAndConvert({ name: "Minh" }, "age"); //Error

//typeof type
let s = "hello";
let n: typeof s;

type Predicate = (x: unknown) => boolean;
type K = ReturnType<Predicate>;

function f() {
  return { x: 10, y: 3 };
}
// type PF = ReturnType<f>; //Error
type F = ReturnType<typeof f>;

//Optional types
interface Animal {
  live(): void;
}
interface Dog extends Animal {
  woof(): void;
}
type Example1 = Dog extends Animal ? number : string;
type Example2 = number;
type Example3 = RegExp extends Animal ? number : string;

// Conđitional types with generic
// >>> ko dùng conditional types với generic
interface IdLabel {
  id: number /* some fields */;
}
interface NameLabel {
  name: string /* other fields */;
}

function createLabel(id: number): IdLabel;
function createLabel(name: string): NameLabel;
function createLabel(nameOrId: string | number): IdLabel | NameLabel;
function createLabel(nameOrId: string | number): IdLabel | NameLabel {
  throw "unimplemented";
}

// >>>> dùng với generic
type NameOrId<T extends number | string> = T extends number
  ? IdLabel
  : NameLabel;
function createLabelB<T extends number | string>(idOrName: T): NameOrId<T> {
  throw "unimplemented";
}
let a = createLabelB("typescript");
let b = createLabelB(2.8);
let c = createLabelB(Math.random() ? "hello" : 42);
</script>
