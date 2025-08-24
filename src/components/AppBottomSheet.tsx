import React, { ReactNode } from 'react';
import {
  Actionsheet,
  ActionsheetBackdrop,
  ActionsheetContent,
  ActionsheetDragIndicatorWrapper,
  ActionsheetDragIndicator,
} from '@gluestack-ui/themed';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

const AppBottomSheet: React.FC<Props> = ({ isOpen, onClose, children }) => (
  <Actionsheet isOpen={isOpen} onClose={onClose}>
    <ActionsheetBackdrop />
    <ActionsheetContent>
      <ActionsheetDragIndicatorWrapper>
        <ActionsheetDragIndicator />
      </ActionsheetDragIndicatorWrapper>
      {children}
    </ActionsheetContent>
  </Actionsheet>
);

export default AppBottomSheet;
