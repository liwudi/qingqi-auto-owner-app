import {PixelRatio, Dimensions, StatusBar} from 'react-native';

const {width, height} = Dimensions.get('window');

const fontScale = PixelRatio.getFontScale(),
    pixelRatio = PixelRatio.get(),
    //baseFontSize = .04 * width;
    //baseFontSize = width / width * .5;
baseFontSize = width / 720;
/*console.info(pixelRatio);
console.info(width);
console.info(height);
console.info(fontScale);
console.info(baseFontSize);*/
/*
console.info(StatusBar.currentHeight)
*/
const fontSize = {
  base: baseFontSize,
  navTitle: baseFontSize * 36,  //导航标题
  articleTitle: baseFontSize * 32,  //文章标题或图标名称
  text: baseFontSize * 28, //文本字体
  note: baseFontSize * 24,  //注释最小字体
  mini: baseFontSize * 18  //注释最小字体

};

const color = {
  main: '#169ada',  //司机端主色
  auxiliary: '#ff9c00',  //辅色
  bg: '#f5f5f5',  //背景
  line: '#e5e5e5',  //（分隔）线
  navTitle: '#ffffff',  //导航标题
  text: '#666666',  //文本
  note: '#999999',  //注释
  important: '#333333',  //重要信息,
  modalBg: 'rgba(0,0,0,0.8)'  //弹窗或者列表黑色半透明背景
};
const button = {
  size: {
    small: {
      width: baseFontSize * 200,
      height: baseFontSize * 72,
      borderRadius: baseFontSize * 4
    },
    middle: {
      width: baseFontSize * 280,
      height: baseFontSize * 82,
      borderRadius: baseFontSize * 6
    },
    large: {
      width: baseFontSize * 660,
      height: baseFontSize * 88,
      borderRadius: baseFontSize * 10
    },
    alert: {
      width: baseFontSize * 250,
      height: baseFontSize * 72,
      borderRadius: baseFontSize * 4
    }
  },
  color: {
    confirm: {
      normal: color.main,
      press: '#007db9',
      disabled: '#dddddd',
      disabledFont: '#ffffff'
    },
    cancel: {
      border: '#dddddd',
      normal: '#ffffff',
      press: '#cccccc',
      disabled: '#dddddd',
      disabledFont: '#ffffff'
    }
  }
};

const spacing = {
  margin: {
    vertical: 30 * fontSize.base,
    horizontal: 30 * fontSize.base
  },
  marginFont: {
    vertical: 10 * fontSize.base,
    horizontal: 10 * fontSize.base
  },
  padding: {
    vertical: 20 * fontSize.base,
    horizontal: 30 * fontSize.base
  }
};


const border = {
  width: 0.5,
  color: color.line
};
const style = {
  containerBackgroundColor: {
      backgroundColor: color.bg
  },
  cardBackgroundColor: {
    backgroundColor: '#ffffff'
  },
  border: {
    borderWidth: border.width,
    borderColor: border.color
  },
  borderBottom: {
    borderBottomWidth: border.width,
    borderBottomColor: border.color
  },
  borderRight: {
    borderRightWidth: border.width,
    borderRightColor: border.color
  },
  fx1: {
    flex:1
  },
  fxRow: {
    flexDirection: 'row'
  },
  fxRowCenter: {
    alignItems: 'center'
  },
  fxColumn: {
    flexDirection: 'column'
  },
  fxCenter: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  fxColumnCenter: {
    justifyContent: 'center'
  },
  navTitle: {
    color: color.navTitle,
    fontSize: fontSize.navTitle
  },
  articleTitle:{
    fontSize: fontSize.articleTitle,
    color: color.articleTitle
  },
  text:{
  	fontSize: fontSize.text,
  	color: color.text
  },
  note: {
  	fontSize: fontSize.note,
  	color: color.note
  },

  marginLeft: {
    marginLeft: spacing.margin.horizontal
  },
  marginBottom: {
    marginBottom: spacing.margin.vertical,
  },
  marginTop: {
    marginTop: spacing.margin.vertical,
  },

  marginVertical: {
    marginVertical: spacing.margin.vertical,
  },
  marginHorizontal: {
    marginHorizontal: spacing.margin.horizontal
  },
  margin: {
    marginVertical: spacing.margin.vertical,
    marginHorizontal: spacing.margin.horizontal
  },
  marginFontBottom: {
    marginBottom: spacing.marginFont.vertical,
  },

  padding: {
    paddingVertical: spacing.padding.vertical,
    paddingHorizontal: spacing.padding.horizontal
  },
  paddingRight: {
    paddingRight: spacing.padding.horizontal
  },
  paddingLeft: {
    paddingLeft: spacing.padding.horizontal
  },
  paddingTop: {
    paddingTop:spacing.padding.vertical
  },
  paddingBottom: {
    paddingBottom:spacing.padding.vertical
  },
  paddingVertical: {
    paddingVertical: spacing.padding.vertical,
  },
  paddingHorizontal: {
    paddingHorizontal:spacing.padding.horizontal
  }
};
const vector = {
  star: {
    color: {
      normal: '#dddddd',
      highlight: color.auxiliary
    },
    size: {
      small: baseFontSize * 26,
      middle: baseFontSize * 28,
      large: baseFontSize * 50
    }
  },
  arrow: {
    color: {
      topBar: '#ffffff',
      listItem: '#666666'
    },
    size: baseFontSize * 20
  }
};
const pattern = {
  phone: /^(1[3-9])\d{9}$/,
  password: /^.{6,20}$/
};
const msg = {
  form: {
    phone: {
      require: '请输入手机',
      placeholder: '请输入手机',
      pattern: '手机格式不正确'
    },
    password: {
      require: '请输入密码',
      placeholder: '请输入密码',
      pattern: '请输入6-20位半角字符，建议数字、字母、符号组合'
    },
    truename: {
      require: '请输入真实姓名',
      placeholder: '请输入真实姓名'
    }
  }
};
export default {
  screen: {
    ratio: pixelRatio,
    width: width,
    height: height - StatusBar.currentHeight,
    fontScale: fontScale
  },
  font: fontSize,
  color: color,
  vector: vector,
  button: button,
  style: style,
  msg: msg,
  pattern: pattern
};
