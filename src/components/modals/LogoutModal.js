import React from 'react';
import {Modal, StyleSheet, TouchableOpacity} from 'react-native';
//----
import {Flex, Typography} from '../../atomComponents';
import Sizer from '../../helpers/Sizer';

const LogoutModal = ({visible, onClose, onConfirm}) => {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}>
      <Flex
        flex={1}
        jusContent="center"
        algItems="center"
        extraStyle={styles.overlay}>
        <Flex
          direction="column"
          jusContent="center"
          algItems="center"
          extraStyle={styles.modalContainer}>
          <Typography size={18} fFamily="poppinsBold600" mB={2}>
            Confirm Logout
          </Typography>
          <Typography size={14} color="#666" mB={4} textAlign="center">
            Are you sure you want to log out?
          </Typography>

          <Flex jusContent="flex-end" gap={Sizer.vSize(2)}>
            <TouchableOpacity onPress={onClose}>
              <Typography size={14} color="#007AFF">
                Cancel
              </Typography>
            </TouchableOpacity>
            <TouchableOpacity onPress={onConfirm} style={styles.logoutBtn}>
              <Typography size={14} color="#fff">
                Log Out
              </Typography>
            </TouchableOpacity>
          </Flex>
        </Flex>
      </Flex>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  modalContainer: {
    width: '80%',
    height: Sizer.hSize(200),
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: Sizer.vSize(4),
  },
  logoutBtn: {
    backgroundColor: '#FF5252',
    paddingVertical: Sizer.vSize(1.5),
    paddingHorizontal: Sizer.vSize(4),
    borderRadius: 4,
  },
});

export default LogoutModal;
