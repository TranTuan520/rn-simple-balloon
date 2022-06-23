# rn-simple-balloon

![preview](https://github.com/TranTuan520/rn-simple-balloon/blob/dev/src/Images/rnballoon.png)

## Install

from yarn

```
add rn-simple-balloon
```

from npm

```
npm i rn-simple-balloon
```

## Usage

```js
import RNBalloon, { Balloon } from 'rn-simple-balloon'

export const archivesTabBalloon = createRef<Balloon>() //export it if you want to open/close it in other component

...

<RNBalloon //put this inside an element you want to show the balloon
    position={'top'}
    ref={archivesTabBalloon}
    autoHide
    duration={3000}
    styles={{
      padding: 8,
      borderRadius: 4
    }}>
      <Image source={Images.heart} style={{ width: 20, height: 20 }} />
      <Text style={{ textAlign: 'center' }}>Tuan Chan with love :3</Text>
</RNBalloon>

...
```

```js
import { balloonRef } from '../RootContainer'

 <TouchableOpacity
    ...
    onPress={() => {
    archivesTabBalloon?.current?.open()
    }}
    ...
  />
```

## Properties

| Prop            | Default | Type       | Description                                                |
| --------------- | ------- | ---------- | ---------------------------------------------------------- |
| **`styles`**    | none    | `object`   | Specify the style of balloon container                     |
| **`position`**  | "top"   | `string`   | Position of the balloon ("top", "bottom", "left", "right") |
| **`onOpen`**    | none    | `function` | Callback function called when the balloon opened           |
| **`onDismiss`** | none    | `function` | Callback function called when the balloon closed           |
| **`duration`**  | 1000    | `number`   | The balloon's open time                                    |

## License

[MIT License](http://opensource.org/licenses/mit-license.html).
