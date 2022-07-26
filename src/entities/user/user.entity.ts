import { UserError } from "./user.error";
import type {
  UserProps,
  UserPropsOptional,
  UserPropsRequired,
} from "./user.types";

enum BusinessRules {
  ID_SHOULD_BE_DEFINED = "ID_SHOULD_BE_DEFINED",
  ID_SHOULD_BE_TYPE_NUMBER = "ID_SHOULD_BE_TYPE_NUMBER",
  ID_SHOULD_BE_AN_INTEGER = "ID_SHOULD_BE_AN_INTEGER",
  ID_SHOULD_BE_POSITIVE = "ID_SHOULD_BE_POSITIVE",
  USERNAME_SHOULD_BE_DEFINED = "USERNAME_SHOULD_BE_DEFINED",
  USERNAME_SHOULD_HAVE_LENGTH_LARGER_THAN_ZERO = "USERNAME_SHOULD_HAVE_LENGTH_LARGER_THAN_ZERO",
}

export class UserEntity {
  #props: Readonly<UserProps>;
  #bookmarks = new Set<number>();
  #collections = new Set<string>();
  #gifts = new Set<number>();
  #pseuds = new Set<string>();
  #series = new Set<number>();
  #works = new Set<number>();

  private constructor(props: UserProps) {
    this.#props = Object.freeze(props);
    this.addBookmarks(...props.bookmarks);
    this.addCollections(...props.collections);
    this.addGifts(...props.gifts);
    this.addPseuds(...props.pseuds);
    this.addSeries(...props.series);
    this.addWorks(...props.works);
  }

  addBookmarks = UserEntity.addValidNumericItems.bind(null, this.#bookmarks);
  addCollections = UserEntity.addValidTextItems.bind(null, this.#collections);
  addGifts = UserEntity.addValidNumericItems.bind(null, this.#gifts);
  addPseuds = UserEntity.addValidTextItems.bind(null, this.#pseuds);
  addSeries = UserEntity.addValidNumericItems.bind(null, this.#series);
  addWorks = UserEntity.addValidNumericItems.bind(null, this.#works);

  toObject(): UserProps {
    return {
      ...this.#props,
      bookmarks: [...this.#bookmarks.values()],
      collections: [...this.#collections.values()],
      gifts: [...this.#gifts.values()],
      pseuds: [...this.#pseuds.values()],
      series: [...this.#series.values()],
      works: [...this.#works.values()],
    };
  }

  toString() {
    return JSON.stringify(this.toObject());
  }

  private static addValidNumericItems(set: Set<number>, ...ids: number[]) {
    ids
      .filter(UserEntity.isDefined)
      .map(Number)
      .filter(UserEntity.isValidNumericId)
      .forEach(set.add, set);
  }

  private static addValidTextItems(set: Set<string>, ...ids: string[]) {
    ids
      .filter(UserEntity.isDefined)
      .map(String)
      .filter(UserEntity.isValidTextId)
      .forEach(set.add, set);
  }

  private static isValidNumericId(value: number) {
    return Number.isInteger(value) && value > 0 && !Number.isNaN(value);
  }

  private static isValidTextId(value: string) {
    return value.length > 0;
  }

  private static isDefined<T>(value: T): value is NonNullable<T> {
    return value !== null && typeof value !== "undefined";
  }

  private static setDefaults({
    bio,
    bookmarks,
    collections,
    created_at,
    email,
    gifts,
    pseuds,
    series,
    works,
  }: UserPropsOptional) {
    return {
      bio: bio || "<unavailable>",
      bookmarks: bookmarks || [],
      collections: collections || [],
      created_at: created_at || "<unavailable>",
      email: email || "<unavailable>",
      gifts: gifts || [],
      pseuds: pseuds || [],
      series: series || [],
      works: works || [],
    };
  }

  static create({
    id,
    username,
    ...rest
  }: UserPropsRequired & UserPropsOptional) {
    const errors: BusinessRules[] = [];
    const cleanId = Number(id);
    const cleanUsername = String(username);

    if (!UserEntity.isDefined(id)) {
      errors.push(BusinessRules.ID_SHOULD_BE_DEFINED);
    }

    if (!UserEntity.isDefined(username)) {
      errors.push(BusinessRules.USERNAME_SHOULD_BE_DEFINED);
    }

    if (Number.isNaN(cleanId)) {
      errors.push(BusinessRules.ID_SHOULD_BE_TYPE_NUMBER);
    }

    if (cleanId < 0) {
      errors.push(BusinessRules.ID_SHOULD_BE_POSITIVE);
    }

    if (!Number.isInteger(cleanId)) {
      errors.push(BusinessRules.ID_SHOULD_BE_AN_INTEGER);
    }

    if (cleanUsername.length === 0) {
      errors.push(BusinessRules.USERNAME_SHOULD_HAVE_LENGTH_LARGER_THAN_ZERO);
    }

    if (errors.length !== 0) {
      throw new UserError(errors);
    }

    return new UserEntity({
      id: cleanId,
      username: cleanUsername,
      ...UserEntity.setDefaults(rest),
    });
  }
}
