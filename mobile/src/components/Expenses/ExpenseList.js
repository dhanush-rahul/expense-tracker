import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; // Using react-native-vector-icons

// Category icons mapped to FontAwesome icons
const categoryIcons = {
  Entertainment: 'film',
  Food: 'utensils',
  Utilities: 'lightbulb',
  Transportation: 'car',
  Rent: 'home',
  Subscriptions: 'tv',
};

const ExpenseList = ({ expenses, onEdit, onDelete }) => {
  return (
    <View style={styles.listContainer}>
      {expenses && expenses.length > 0 ? (
        expenses.map((expense) => (
          <View key={expense.id} style={styles.expenseItem}>
            {/* Category Icon */}
            <View style={styles.iconContainer}>
              <Icon
                name={categoryIcons[expense.category] || 'question'}
                size={24}
                color="#4A4A4A"
              />
            </View>

            {/* Expense Info */}
            <View style={styles.expenseInfo}>
              <Text style={styles.expenseDescription}>{expense.description}</Text>
              <Text style={styles.expenseDate}>{new Date(expense.date).toLocaleDateString()}</Text>
            </View>

            {/* Amount and Buttons */}
            <View style={styles.amountAndActions}>
              <Text style={styles.expenseAmount}>CAD {expense.amount.toFixed(2)}</Text>
              <Text style={styles.expenseCategory}>{expense.category}</Text>

              {/* Edit and Delete Buttons */}
              <View style={styles.actionButtons}>
                <TouchableOpacity
                  style={[styles.actionButton, styles.editButton]}
                  onPress={() => onEdit(expense)}
                >
                  <Icon name="edit" size={20} color="#fff" />
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.actionButton, styles.deleteButton]}
                  onPress={() => onDelete(expense.id)}
                >
                  <Icon name="trash" size={20} color="#fff" />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ))
      ) : (
        <Text style={styles.noExpensesText}>No expenses available</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  listContainer: {
    maxHeight: 400, // Adjust based on your needs
    overflow: 'scroll',
    paddingHorizontal: 10,
  },
  expenseItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  iconContainer: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    borderRadius: 20,
    marginRight: 10,
  },
  expenseInfo: {
    flex: 1,
  },
  expenseDescription: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  expenseDate: {
    fontSize: 14,
    color: '#888',
  },
  amountAndActions: {
    alignItems: 'flex-end',
  },
  expenseAmount: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  expenseCategory: {
    fontSize: 14,
    color: '#888',
  },
  actionButtons: {
    flexDirection: 'row',
    marginTop: 5,
  },
  actionButton: {
    padding: 8,
    borderRadius: 5,
    marginLeft: 5,
  },
  editButton: {
    backgroundColor: '#007bff',
  },
  deleteButton: {
    backgroundColor: '#dc3545',
  },
  noExpensesText: {
    textAlign: 'center',
    color: '#888',
    marginTop: 20,
  },
});

export default ExpenseList;
