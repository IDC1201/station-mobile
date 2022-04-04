import React, { ReactElement, useEffect, useState } from 'react'
import {
  View,
  StyleSheet,
  StyleProp,
  ViewStyle,
  TouchableOpacity,
  Modal,
} from 'react-native'
import _ from 'lodash'
import { useNavigation } from '@react-navigation/core'

import { COLOR, LAYOUT, UTIL } from 'consts'

import { Field, Option, Options } from 'lib'

import Input from 'components/Input'
import { Text, Icon } from 'components'

import AssetIcon from './AssetIcon'
import CoinSelector from './CoinSelector'

const SelectCoin = ({
  selectField,
  disabled,
  selectPlaceHolder,
}: {
  selectField: Field
  disabled: boolean
  selectPlaceHolder: string
}): ReactElement => {
  const [isVisibleModal, setIsVisibleModal] = useState(false)
  const optionListFromField: Options =
    selectField.options?.filter((x) => !x.disabled) || []

  const selected = optionListFromField.find(
    (x) => x.value === selectField.attrs.value
  )

  const onSelect = (option: Option): void => {
    selectField.setValue?.(option.value)
  }

  const { addListener } = useNavigation()
  useEffect(() => {
    addListener('blur', (): void => {
      setIsVisibleModal(false)
    })
  }, [])

  const SelectedOptionText = (): ReactElement => {
    return selected ? (
      <View style={styles.selectedOptionText}>
        <AssetIcon option={selected} />
        <Text fontType={'medium'} style={{ marginLeft: 5 }}>
          {selected.children}
        </Text>
      </View>
    ) : (
      <Text>{selectPlaceHolder}</Text>
    )
  }
  return (
    <>
      <TouchableOpacity
        style={styles.selectButton}
        activeOpacity={1}
        onPress={(): void => {
          if (disabled) {
            return
          }

          setIsVisibleModal(true)
        }}
      >
        <SelectedOptionText />
        <View style={{ marginRight: 10 }}>
          <Icon
            name={'arrow-drop-down'}
            size={18}
            color={COLOR.primary._02}
          />
        </View>
      </TouchableOpacity>
      <Modal
        onRequestClose={(): void => {
          setIsVisibleModal(false)
        }}
        transparent
        visible={isVisibleModal}
      >
        <CoinSelector
          onSelect={onSelect}
          list={optionListFromField}
          closeModal={(): void => {
            setIsVisibleModal(false)
          }}
        />
      </Modal>
    </>
  )
}

const SelectInputForm = ({
  disabled,
  selectField,
  inputField,
  containerStyle,
  selectPlaceHolder,
}: {
  disabled: boolean
  selectField: Field
  inputField: Field
  containerStyle?: StyleProp<ViewStyle>
  selectPlaceHolder: string
}): ReactElement => {
  const { error: inputError } = inputField
  const { error: selectError } = selectField
  const error = inputError || selectError
  const isCoinSelected = _.some(selectField.attrs.value)

  const handleOnChange = (value: string) => {
    if (value.charAt(value.length - 1) === ',') {
      value = UTIL.lastCommaToDot(value)
    }
    inputField.setValue?.(value)
  }

  return (
    <View
      style={{
        opacity: disabled ? 0.4 : 1,
        marginBottom: 10,
      }}
    >
      <View
        style={[
          {
            flexDirection: 'row',
            borderRadius: 8,
            borderWidth: 1,
            borderColor: '#cfd8ea',
          },
          containerStyle,
        ]}
      >
        <SelectCoin
          selectField={selectField}
          disabled={disabled}
          selectPlaceHolder={selectPlaceHolder}
        />
        {isCoinSelected && (
          <Input
            value={inputField.attrs.value}
            defaultValue={inputField.attrs.defaultValue}
            editable={!disabled && !inputField.attrs.readOnly}
            placeholder={inputField.attrs.placeholder}
            onChangeText={handleOnChange}
            containerStyle={{
              flex: 2,
              borderWidth: 0,
              marginBottom: 1,
            }}
            keyboardType="numeric"
            maxLength={30}
            style={{
              borderRadius: 0,
              borderTopRightRadius: 8,
              borderBottomRightRadius: 8,
              backgroundColor: !inputField.attrs.readOnly
                ? 'white'
                : '#ebeff8',
            }}
            autoCorrect={false}
          />
        )}
      </View>
      {_.some(inputField.attrs.value) &&
        _.some(selectField.attrs.value) &&
        _.some(error) && (
          <View style={styles.errorMessageBox}>
            <Icon name={'info'} color={COLOR.red} size={12} />
            <Text style={styles.errorMessage} fontType={'medium'}>
              {error}
            </Text>
          </View>
        )}
    </View>
  )
}

export default SelectInputForm

const styles = StyleSheet.create({
  errorMessageBox: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 5,
  },
  errorMessage: {
    color: COLOR.red,
    fontSize: 10,
    paddingLeft: 5,
  },
  selectButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flex: LAYOUT.getScreenWideType() === 'narrow' ? 2 : 1,
    borderWidth: 0,
    borderRadius: 0,
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
    height: 45,
    paddingHorizontal: 10,
  },
  selectedOptionText: {
    flexDirection: 'row',
    alignItems: 'center',
  },
})
