# Initialize ATM Machine
initialize_ATM(ANEW BANK)

# Main loop for ATM operations
while ATM_is_active:
    try:
        # User authentication
        user_card = read_card(ATM Card)
        if not validate_card(user_card):
            raise InvalidCardError("Card is not valid")
        
        user_pin = input_pin()
        if not validate_pin(user_card, user_pin):
            raise AuthenticationError("Invalid PIN")
        
        # Transaction selection
        transaction_type = get_transaction_type()
        if transaction_type == 'withdrawal':
            amount = input_amount()
            
            # Check account balance
            if not check_balance(user_card, amount):
                raise InsufficientFundsError("Insufficient balance")
            
            # Dispense cash
            if not dispense_cash(amount):
                raise DispenseError("Cash dispensing failed")
        
        elif transaction_type == 'balance_inquiry':
            display_balance(user_card)
        
        else:
            raise InvalidTransactionError("Invalid transaction type")
        
        # Log transaction
        log_transaction(user_card, transaction_type, amount)

    except InvalidCardError as e:
        display_message(e)
        log_error(e)

    except AuthenticationError as e:
        display_message(e)
        log_error(e)

    except InsufficientFundsError as e:
        display_message(e)
        log_error(e)

    except DispenseError as e:
        display_message(e)
        log_error(e)
        revert_transaction(user_card, amount)
    
    except Exception as e:
        display_message("An unexpected error occurred")
        log_error(e)
        revert_transaction(user_card, amount)

    finally:
        eject_card()

# Shutdown ATM
shutdown_ATM()