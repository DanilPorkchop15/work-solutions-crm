export abstract class AppRoutes {
  public static getRootUrl = () => "/";

  public static getProfileUrl = (withPrefix = false) =>
    `${AppRoutes._calculatePrefix(AppRoutes.getRootUrl(), withPrefix)}profile`;

  public static getChangePasswordUrl = (withPrefix = false) =>
    `${AppRoutes._calculatePrefix(AppRoutes.getProfileUrl(true), withPrefix)}change-password`;

  public static getUsersUrl = (withPrefix = false) =>
    `${AppRoutes._calculatePrefix(AppRoutes.getRootUrl(), withPrefix)}users`;

  public static getUserUrl = (withPrefix = false, id = ":id") =>
    `${AppRoutes._calculatePrefix(AppRoutes.getRootUrl(), withPrefix)}users/${id}`;

  public static getCreateUserUrl = (withPrefix = false) =>
    `${AppRoutes._calculatePrefix(AppRoutes.getUsersUrl(true), withPrefix)}create`;

  public static getUserImportUrl = (withPrefix = false) =>
    `${AppRoutes._calculatePrefix(AppRoutes.getUsersUrl(true), withPrefix)}import`;

  public static getUpdateUserUrl = (withPrefix = false, id = ":id") =>
    `${AppRoutes._calculatePrefix(AppRoutes.getUsersUrl(true), withPrefix)}${id}/update`;

  public static getAuthUrl = () => "/auth";

  public static getProjectsUrl = (withPrefix = false) =>
    `${AppRoutes._calculatePrefix(AppRoutes.getRootUrl(), withPrefix)}projects`;

  public static getProjectUrl = (withPrefix = false, id = ":id") =>
    `${AppRoutes._calculatePrefix(AppRoutes.getRootUrl(), withPrefix)}projects/${id}`;

  public static getCreateProjectUrl = (withPrefix = false) =>
    `${AppRoutes._calculatePrefix(AppRoutes.getProjectsUrl(true), withPrefix)}create`;

  public static getUpdateProjectUrl = (withPrefix = false, id = ":id") =>
    `${AppRoutes._calculatePrefix(AppRoutes.getProjectsUrl(true), withPrefix)}${id}/update`;

  public static getDocumentsUrl = (withPrefix = false) =>
    `${AppRoutes._calculatePrefix(AppRoutes.getRootUrl(), withPrefix)}documents`;

  public static getDocumentUrl = (withPrefix = false, id = ":id") =>
    `${AppRoutes._calculatePrefix(AppRoutes.getRootUrl(), withPrefix)}documents/${id}`;

  public static getCreateDocumentUrl = (withPrefix = false) =>
    `${AppRoutes._calculatePrefix(AppRoutes.getDocumentsUrl(true), withPrefix)}create`;

  public static getUpdateDocumentUrl = (withPrefix = false, id = ":id") =>
    `${AppRoutes._calculatePrefix(AppRoutes.getDocumentsUrl(true), withPrefix)}${id}/update`;

  public static getCustomersUrl = (withPrefix = false) =>
    `${AppRoutes._calculatePrefix(AppRoutes.getRootUrl(), withPrefix)}customers`;

  public static getCustomerUrl = (withPrefix = false, id = ":id") =>
    `${AppRoutes._calculatePrefix(AppRoutes.getRootUrl(), withPrefix)}customers/${id}`;

  public static getCreateCustomerUrl = (withPrefix = false) =>
    `${AppRoutes._calculatePrefix(AppRoutes.getCustomersUrl(true), withPrefix)}create`;

  public static getUpdateCustomerUrl = (withPrefix = false, id = ":id") =>
    `${AppRoutes._calculatePrefix(AppRoutes.getCustomersUrl(true), withPrefix)}${id}/update`;

  public static getCreateProjectForCustomerUrl = (withPrefix = false, id = ":id") =>
    `${AppRoutes._calculatePrefix(AppRoutes.getCustomerUrl(true, id), withPrefix)}create-project`;

  private static readonly _calculatePrefix = (prefix: string, withPrefix: boolean) =>
    !withPrefix ? "" : prefix !== "/" ? `${prefix}/` : prefix;
}
