export abstract class AppRoutes {
  public static getRootUrl = () => "/";

  public static getProfileUrl = (withPrefix = false) =>
    `${AppRoutes._calculatePrefix(AppRoutes.getAuthUrl(), withPrefix)}profile`;

  public static getUsersUrl = (withPrefix = false) =>
    `${AppRoutes._calculatePrefix(AppRoutes.getRootUrl(), withPrefix)}users`;

  public static getUserUrl = (withPrefix = false, id = ":id") =>
    `${AppRoutes._calculatePrefix(AppRoutes.getRootUrl(), withPrefix)}users/${id}`;

  public static getCreateUserUrl = (withPrefix = false) =>
    `${AppRoutes._calculatePrefix(AppRoutes.getRootUrl(), withPrefix)}users/create`;

  public static getUpdateUserUrl = (withPrefix = false, id = ":id") =>
    `${AppRoutes._calculatePrefix(AppRoutes.getRootUrl(), withPrefix)}users/${id}/update`;

  public static getAuthUrl = () => "/auth";

  public static getProjectsUrl = (withPrefix = false) =>
    `${AppRoutes._calculatePrefix(AppRoutes.getRootUrl(), withPrefix)}projects`;

  public static getTasksUrl = (withPrefix = false) =>
    `${AppRoutes._calculatePrefix(AppRoutes.getRootUrl(), withPrefix)}tasks`;

  public static getTaskUrl = (withPrefix = false, id = ":id") =>
    `${AppRoutes._calculatePrefix(AppRoutes.getRootUrl(), withPrefix)}tasks/${id}`;

  public static getDocumentsUrl = (withPrefix = false) =>
    `${AppRoutes._calculatePrefix(AppRoutes.getRootUrl(), withPrefix)}documents`;

  public static getDocumentUrl = (withPrefix = false, id = ":id") =>
    `${AppRoutes._calculatePrefix(AppRoutes.getRootUrl(), withPrefix)}documents/${id}`;

  public static getCustomersUrl = (withPrefix = false) =>
    `${AppRoutes._calculatePrefix(AppRoutes.getRootUrl(), withPrefix)}customers`;

  public static getCustomerUrl = (withPrefix = false, id = ":id") =>
    `${AppRoutes._calculatePrefix(AppRoutes.getRootUrl(), withPrefix)}customers/${id}`;

  private static readonly _calculatePrefix = (prefix: string, withPrefix: boolean) =>
    withPrefix ? (prefix !== "/" ? `${prefix}/` : prefix) : "";
}
