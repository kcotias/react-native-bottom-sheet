import React, { Component } from "react";
import {
  View,
  Modal,
  TouchableOpacity,
  Animated,
  PanResponder,
  BackHandler
} from "react-native";
import styles from "./styles";

class BottomSheet extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      animatedHeight: new Animated.Value(0),
      pan: new Animated.ValueXY()
    };

    this.createPanResponder(props);
  }

  _backPressHandler = () => {
    this.setModalVisible(false);
    return true;
  }

  addBackPressEventListner() {
    //If useModal is not true, implement custom back press handler
    if (!this.props.useModal) {
      BackHandler.addEventListener('hardwareBackPress', this._backPressHandler)
    }
  }

  removeBackPressEventListner() {
    //Remove custom back press handler when unmounting
    if (!this.props.useModal) {
      BackHandler.removeEventListener('hardwareBackPress', this._backPressHandler)
    }
  }

  setModalVisible(visible) {
    const {
      closeFunction,
      height,
      hasDragabbleIcon,
      backgroundColor,
      dragIconColor
    } = this.props;
    const { animatedHeight, pan } = this.state;
    if (visible) {
      this.setState({ modalVisible: visible });
      this.addBackPressEventListner();
      Animated.timing(animatedHeight, {
        toValue: height,
        duration: 300
      }).start();
    } else {
      this.removeBackPressEventListner();
      Animated.timing(animatedHeight, {
        toValue: 0,
        duration: 400
      }).start(() => {
        pan.setValue({ x: 0, y: 0 });
        this.setState({
          modalVisible: visible,
          animatedHeight: new Animated.Value(0)
        });
        if (typeof closeFunction === "function") closeFunction();
      });
    }
  }

  createPanResponder(props) {
    const { height,
      draggable = true
    } = props;
    const { pan } = this.state;
    this.panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (e, gestureState) => {
        if (draggable && gestureState.dy > 0) {
          Animated.event([null, { dy: pan.y }])(e, gestureState);
        }
      },
      onPanResponderRelease: (e, gestureState) => {
        const gestureLimitArea = height / 3;
        const gestureDistance = gestureState.dy;
        if (draggable && gestureDistance > gestureLimitArea) {
          this.setModalVisible(false);
        } else {
          Animated.spring(pan, { toValue: { x: 0, y: 0 } }).start();
        }
      }
    });
  }

  show() {
    this.setModalVisible(true);
  }

  close() {
    this.setModalVisible(false);
  }

  _renderAnimatedView({
    children,
    hasDraggableIcon,
    dragIconColor,
    animatedHeight,
    pan,
  }) {

    const panStyle = {
      transform: pan.getTranslateTransform()
    };
    return (
      <>
        <TouchableOpacity
          style={styles.background}
          activeOpacity={1}
          onPress={() => this.close()}
        />
        <Animated.View
          {...this.panResponder.panHandlers}
          style={[panStyle, styles.container, { height: animatedHeight }]}
        >
          {hasDraggableIcon && (
            <View style={styles.draggableContainer}>
              <View
                style={[
                  styles.draggableIcon,
                  {
                    backgroundColor: dragIconColor || "#A3A3A3"
                  }
                ]}
              />
            </View>
          )}
          {children}
        </Animated.View>
      </>
    )
  }

  render() {
    const {
      height,
      backgroundColor,
      useModal = true,
    } = this.props;
    const { modalVisible } = this.state;


    return (
      <>
        {useModal ? <Modal
          transparent
          visible={modalVisible}
          onRequestClose={() => this.setModalVisible(false)}
        >
          <View
            style={[
              styles.wrapper,
              { backgroundColor: backgroundColor || "#25252599" }
            ]}
          >
            {this._renderAnimatedView({ ...this.props, ...this.state })}
          </View>
        </Modal>
          : modalVisible && this.setModalVisible &&
          <View
            style={[
              styles.wrapper,
              {
                backgroundColor: backgroundColor || "#25252599",
                height: height,
                backgroundColor: backgroundColor || 'transparent',
                position: 'absolute',
                bottom: 0,
                width: '100%'
              }
            ]}
          >
            {this._renderAnimatedView({ ...this.props, ...this.state })}
          </View>
        }
      </>);

  }
}

export default BottomSheet;
