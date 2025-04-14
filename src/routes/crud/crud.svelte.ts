export class Crud {
  public name = $state("");
  public surname = $state("");

  constructor(name: string, surname: string) {
    this.name = name;
    this.surname = surname;
  }

  fullName() {
    return `${this.surname}, ${this.name}`;
  }

  getName() {
    return this.name;
  }
  getSurname() {
    return this.surname;
  }

  update(name: string, surname: string) {
    this.name = name;
    this.surname = surname;
  }
  updatePerson(person: Crud) {
    this.name = person.name;
    this.surname = person.surname;
  }
}
