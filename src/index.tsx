import React, {
  useImperativeHandle,
  useState,
  ReactElement,
  useMemo,
  useRef,
  Ref
} from 'react'
import { LayoutChangeEvent, View, ViewStyle, Animated } from 'react-native'

// Styles
import commonStyles from './styles'

interface BalloonProps {
  styles?: ViewStyle
  position: 'top' | 'bottom' | 'left' | 'right'
  autoHide?: boolean
  duration?: number
  onOpen?: () => void
  onDismiss?: () => void
  children?: ReactElement | ReactElement[]
}

export interface Balloon {
  open: () => void
  close: () => void
}

const RNBalloon = React.forwardRef((props: BalloonProps, ref: Ref<Balloon>) => {
  const { styles, position, autoHide, duration, onOpen, onDismiss, children } =
    props

  const [isVisible, setIsVisible] = useState(false)

  const [balloonLayout, setBalloonLayout] = useState<{
    width: number
    height: number
  }>({ width: 0, height: 0 })

  const balloonScale = useRef(new Animated.Value(0.2)).current

  useImperativeHandle(ref, () => ({
    open: (openDuration?: number) => {
      if (!isVisible) {
        setIsVisible(true)
        Animated.spring(balloonScale, {
          toValue: 1,
          friction: 6,
          useNativeDriver: true
        }).start(() => {
          onOpen && onOpen()
          if (autoHide) {
            const timeout = setTimeout(() => {
              Animated.timing(balloonScale, {
                toValue: 0,
                duration: 200,
                useNativeDriver: true
              }).start(() => {
                setIsVisible(false)
                clearTimeout(timeout)
              })
            }, duration ?? openDuration ?? 1000)
          }
        })
      }
    },
    close: () => {
      Animated.timing(balloonScale, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true
      }).start(() => {
        onDismiss && onDismiss()
        setIsVisible(false)
      })
    }
  }))

  const arrowSize = useMemo(() => {
    const { width, height } = balloonLayout
    if (width > height) return height * 0.4
    return width * 0.3
  }, [balloonLayout])

  const generatePosition = () => {
    const { width, height } = balloonLayout
    switch (position) {
      case 'top':
        return { top: -height - arrowSize }
      case 'bottom':
        return { bottom: -height - arrowSize }
      case 'left':
        return { left: -width - arrowSize }
      case 'right':
        return { right: -width - arrowSize }
    }
  }

  const generateArrowStyles: () => ViewStyle = () => {
    switch (position) {
      case 'top':
        return {
          bottom: -arrowSize / 2,
          ...(styles?.borderRadius && {
            borderBottomRightRadius: styles?.borderRadius
          })
        }
      case 'bottom':
        return {
          top: -arrowSize / 2,
          ...(styles?.borderRadius && {
            borderTopLeftRadius: styles?.borderRadius
          })
        }
      case 'left':
        return {
          right: -arrowSize / 2,
          ...(styles?.borderRadius && {
            borderTopRightRadius: styles?.borderRadius
          })
        }
      case 'right':
        return {
          left: -arrowSize / 2,
          ...(styles?.borderRadius && {
            borderBottomLeftRadius: styles?.borderRadius
          })
        }
    }
  }

  return (
    <>
      {isVisible && (
        <Animated.View
          onLayout={(event: LayoutChangeEvent) => {
            const { width, height } = event.nativeEvent.layout
            setBalloonLayout({ width, height })
          }}
          style={{
            ...commonStyles.container,
            ...styles,
            ...generatePosition(),
            transform: [{ scale: balloonScale }]
          }}
        >
          <View
            style={{
              ...commonStyles.arrow,
              ...(styles?.backgroundColor && {
                backgroundColor: styles.backgroundColor
              }),

              width: arrowSize,
              height: arrowSize,
              ...generateArrowStyles()
            }}
          />
          {children}
        </Animated.View>
      )}
    </>
  )
})

export default RNBalloon
