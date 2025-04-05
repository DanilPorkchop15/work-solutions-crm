import { ThemeConfig } from "antd";

export const darkTheme: ThemeConfig = {
  token: {
    colorSuccess: "#5bbb28",
    colorWarning: "#ecdd92",
    colorError: "#f68181",
    colorText: "rgb(220, 220, 220)",
    colorTextSecondary: "#E0E0E0",
    colorTextTertiary: "#A0A0A0",
    colorTextQuaternary: "#FFFFFF",
    colorTextPlaceholder: "#8A8A8A",
    boxShadowTertiary: "0px -40px 48px -16px rgba(0, 0, 0, 0.36)",
    colorWhite: "#121212",
    colorSuccessText: "#5bbb28",
    colorSuccessHover: "#338707",
    colorSuccessTextHover: "#338707",
    colorSuccessActive: "#225905",
    colorSuccessTextActive: "#225905",
    colorSuccessBg: "#1E3A14",
    colorSuccessBgHover: "#2A511A",
    colorSuccessBorder: "#5bbb28",
    colorSuccessBorderHover: "#338707",
    colorWarningBg: "#3A3518",
    colorWarningBgHover: "#4D461F",
    colorWarningBorder: "#ecdd92",
    colorWarningText: "#ecdd92",
    colorWarningBorderHover: "#e0c952",
    colorWarningHover: "#e0c952",
    colorWarningTextHover: "#e0c952",
    colorWarningActive: "#b89f21",
    colorWarningTextActive: "#b89f21",
    colorErrorBorder: "#f68181",
    colorErrorText: "#f68181",
    colorErrorBg: "#3A1414",
    colorErrorBgHover: "#4D1A1A",
    colorErrorHover: "#e22929",
    colorErrorBorderHover: "#e22929",
    colorErrorTextHover: "#e22929",
    colorErrorActive: "#9e0505",
    colorErrorTextActive: "#9e0505",
    colorLink: "#4eace8",
    colorPrimaryTextActive: "#075180",
    colorPrimaryActive: "#075180",
    colorPrimaryHover: "#0b7ac2",
    colorPrimaryTextHover: "#0b7ac2",
    colorPrimaryBorderHover: "#0b7ac2",
    colorPrimary: "#4eace8",
    colorInfo: "#4eace8",
    colorPrimaryText: "#4eace8",
    colorPrimaryBorder: "#4eace8",
    colorPrimaryBg: "#0D2A40",
    colorPrimaryBgHover: "#133A5A",
    colorLinkHover: "#4eace8",
    colorLinkActive: "#075180",
    colorTextBase: "#E0E0E0",
    colorBorder: "#444444",
    colorBorderSecondary: "#333333",
    colorBgContainer: "#1E1E1E",
    colorBgElevated: "#252525",
    colorBgLayout: "#121212"
  },
  components: {
    Typography: {
      titleMarginBottom: 0,
      titleMarginTop: 0,
      colorTextHeading: "#E0E0E0"
    },
    Tooltip: {
      colorBgSpotlight: "#1E1E1E",
      colorTextLightSolid: "#D1D1D1"
    },
    Layout: {
      bodyBg: "#121212",
      headerBg: "#1E1E1E",
      colorBgContainer: "#1E1E1E",
      colorBgElevated: "#252525",
      footerBg: "#1E1E1E",
      siderBg: "#1E1E1E"
    },
    Input: {
      colorBorder: "#444444",
      colorErrorBorder: "#5A1A1A",
      paddingInline: 16,
      lineWidth: 2,
      borderRadius: 8,
      colorError: "#F7AAAA",
      colorErrorHover: "#F7AAAA",
      hoverBg: "#252525",
      colorBgContainer: "#252525",
      colorTextPlaceholder: "#8A8A8A",
      hoverBorderColor: "#4eace8",
      activeBorderColor: "#4eace8",
      colorText: "#E0E0E0"
    },
    Button: {
      defaultHoverColor: "#E0E0E0",
      defaultHoverBorderColor: "#555555",
      colorTextDisabled: "rgba(220, 220, 220, 0.3)",
      defaultBg: "#252525",
      defaultBorderColor: "#444444",
      defaultColor: "#E0E0E0"
    },
    Switch: {
      colorTextQuaternary: "rgb(80, 80, 80)",
      handleShadow: "0 2px 4px 0 rgba(0, 0, 0, 0.4)"
    },
    Badge: {
      lineWidth: 2,
      statusSize: 6,
      colorBgContainer: "#1E1E1E"
    },
    Pagination: {
      borderRadius: 50,
      colorBgTextHover: "#2A3A4A",
      colorPrimaryBorder: "#444444",
      colorBgTextActive: "#2A3A4A",
      itemActiveBg: "#2A3A4A",
      colorTextDisabled: "rgba(220, 220, 220, 0.3)"
    },
    Menu: {
      itemSelectedBg: "#252525",
      subMenuItemBg: "#1E1E1E",
      itemSelectedColor: "#4eace8",
      activeBarBorderWidth: 0,
      activeBarWidth: 4,
      itemBorderRadius: 0,
      subMenuItemBorderRadius: 0,
      borderRadius: 0,
      borderRadiusLG: 0,
      itemBg: "#1E1E1E",
      groupTitleColor: "#8A8A8A",
      itemColor: "#E0E0E0",
      itemHoverColor: "#FFFFFF",
      itemHoverBg: "#252525"
    },
    Table: {
      borderColor: "#444444",
      headerBorderRadius: 6,
      headerSplitColor: "rgba(255, 255, 255, 0.05)",
      headerBg: "#252525",
      rowHoverBg: "#2A2A2A",
      colorBgContainer: "#1E1E1E",
      headerColor: "#E0E0E0"
    },
    Avatar: {
      containerSizeSM: 16,
      containerSize: 24,
      containerSizeLG: 32,
      textFontSizeSM: 12,
      textFontSize: 16,
      textFontSizeLG: 22,
      colorTextPlaceholder: "#B592EC"
    },
    Select: {
      colorTextDisabled: "rgba(220, 220, 220, 0.3)",
      colorTextQuaternary: "#E0E0E0",
      optionPadding: "8px 16px",
      optionSelectedBg: "#252525",
      optionSelectedColor: "#4eace8",
      colorBgContainer: "#252525",
      colorBgElevated: "#1E1E1E"
    },
    Modal: {
      borderRadiusLG: 6,
      colorBgMask: "rgba(0, 0, 0, 0.65)",
      contentBg: "#252525",
      headerBg: "#252525",
      titleColor: "#E0E0E0"
    },
    Card: {
      boxShadow: "0px 5px 50px 0px rgba(0, 0, 0, 0.30)",
      boxShadowTertiary: "0px 5px 50px 0px rgba(0, 0, 0, 0.30)",
      borderRadiusLG: 6,
      colorBgContainer: "#252525"
    },
    Upload: {
      colorFillAlter: "rgba(30, 30, 30, 0.65)",
      colorBorder: "#444444"
    },
    Divider: {
      colorSplit: "#444444"
    },
    Drawer: {
      colorBgElevated: "#252525"
    },
    Dropdown: {
      colorBgElevated: "#252525"
    },
    Tabs: {
      itemColor: "#A0A0A0",
      itemSelectedColor: "#4eace8",
      itemHoverColor: "#E0E0E0",
      inkBarColor: "#4eace8"
    }
  }
};
