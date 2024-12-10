
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StatusBar,
  ScrollView,
  TouchableOpacity,
  Image,
  StyleSheet,
  TextInput
} from 'react-native';
import { COLOURS, Items } from '../database/Database';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Home = ({ navigation }) => {
  const [products, setProducts] = useState([]);
  const [accessory, setAccessory] = useState([]);
  const [searchQuery, setSearchQuery] = useState(''); // State to hold the search query
  const [filteredProducts, setFilteredProducts] = useState([]); // State to hold the filtered products
  const [filteredAccessories, setFilteredAccessories] = useState([]); // State to hold the filtered accessories

  // search data - filter the products and accessories based on search query
  const searchData = (query) => {
    setSearchQuery(query);
    
    if (query === '') {
      // If search query is empty, show all products and accessories
      setFilteredProducts(products);
      setFilteredAccessories(accessory);
    } else {
      // Filter products and accessories based on query
      const filteredProd = products.filter((product) =>
        product.productName.toLowerCase().includes(query.toLowerCase())
      );
      const filteredAcc = accessory.filter((acc) =>
        acc.productName.toLowerCase().includes(query.toLowerCase())
      );

      setFilteredProducts(filteredProd);
      setFilteredAccessories(filteredAcc);
    }
  };

  // get called on screen loads
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getDataFromDB();
    });

    return unsubscribe;
  }, [navigation]);

  // get data from DB
  const getDataFromDB = () => {
    let productList = [];
    let accessoryList = [];
    for (let index = 0; index < Items.length; index++) {
      if (Items[index].category === 'product') {
        productList.push(Items[index]);
      } else if (Items[index].category === 'accessory') {
        accessoryList.push(Items[index]);
      }
    }

    setProducts(productList);
    setAccessory(accessoryList);
    setFilteredProducts(productList); // Initialize filtered products
    setFilteredAccessories(accessoryList); // Initialize filtered accessories
  };

  // create a product reusable card
  const ProductCard = ({ data }) => {
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate('ProductInfo', { productID: data.id })}
        style={styles.productCard}>
        <View style={styles.cardContainer}>
          {data.isOff ? (
            <View style={styles.offBadge}>
              <Text style={styles.offText}>{data.offPercentage}%</Text>
            </View>
          ) : null}
          <Image source={data.productImage} style={styles.productImage} />
        </View>
        <Text style={styles.productName}>{data.productName}</Text>
        {data.category === 'accessory' ? (
          data.isAvailable ? (
            <View style={styles.availabilityContainer}>
              <FontAwesome name="circle" style={styles.availableIcon} />
              <Text style={styles.availableText}>Available</Text>
            </View>
          ) : (
            <View style={styles.availabilityContainer}>
              <FontAwesome name="circle" style={styles.unavailableIcon} />
              <Text style={styles.unavailableText}>Unavailable</Text>
            </View>
          )
        ) : null}
        <Text style={styles.productPrice}>&#x24;{data.productPrice}.00</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={COLOURS.white} barStyle="dark-content" />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.headerContainer}>

          <TouchableOpacity>
            <Entypo
              name="chevron-left"
              style={styles.iconStyle}
            />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate('MyCart')}>
            <MaterialCommunityIcons
              name="cart"
              style={styles.iconStyle}
            />
          </TouchableOpacity>

          

        </View>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <TouchableOpacity onPress={() => searchData(searchQuery)}>
          
          <TextInput
            style={styles.searchInput}
            placeholder="search for products or accessories"
            placeholderTextColor={'black'}
            value={searchQuery}
            onChangeText={(text) => searchData(text)} // Trigger search as text changes
            
          />
          </TouchableOpacity>
          
          
        </View>

        <View style={styles.shopInfoContainer}>
          <Text style={styles.shopTitle}>Hi-Fi Shop &amp; Service</Text>
          <Text style={styles.shopDescription}>
            Audio shop on Rustaveli Ave 57. 
            {'\n'}This shop offers both products and services
          </Text>
        </View>
        
        {/* Products Section */}
        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeader}>
            <View style={styles.sectionTitleContainer}>
              <Text style={styles.sectionTitle}>Products</Text>
              <Text style={styles.sectionCount}>{filteredProducts.length}</Text>
            </View>
            <Text style={styles.seeAllText}>Show All</Text>
          </View>
          <View style={styles.productListContainer}>
            {filteredProducts.map((data) => (
              <ProductCard data={data} key={data.id} />
            ))}
          </View>
        </View>

        {/* Accessories Section */}
        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeader}>
            <View style={styles.sectionTitleContainer}>
              <Text style={styles.sectionTitle}>Accessories</Text>
              <Text style={styles.sectionCount}>{filteredAccessories.length}</Text>
            </View>
            <Text style={styles.seeAllText}>Show All</Text>
          </View>
          <View style={styles.productListContainer}>
            {filteredAccessories.map((data) => (
              <ProductCard data={data} key={data.id} />
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: COLOURS.white,
  },
  headerContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
  },
  iconStyle: {
    fontSize: 18,
    color: COLOURS.backgroundMedium,
    padding: 12,
    borderRadius: 10,
    backgroundColor: COLOURS.backgroundLight,
  },
  searchContainer: {
    padding: 16,
  },
  searchInput: {
    height: 40,
    borderColor: COLOURS.backgroundLight,
    borderWidth: 1,
    borderRadius: 10,
    paddingLeft: 10,
    fontSize: 16,
    borderColor:'black',
    padding:2
  },
  shopInfoContainer: {
    marginBottom: 10,
    padding: 16,
  },
  shopTitle: {
    fontSize: 26,
    color: COLOURS.black,
    fontWeight: '500',
    letterSpacing: 1,
    marginBottom: 10,
  },
  shopDescription: {
    fontSize: 14,
    color: COLOURS.black,
    fontWeight: '400',
    letterSpacing: 1,
    lineHeight: 24,
  },
  sectionContainer: {
    padding: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  sectionTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 18,
    color: COLOURS.black,
    fontWeight: '500',
    letterSpacing: 1,
  },
  sectionCount: {
    fontSize: 14,
    color: COLOURS.black,
    fontWeight: '400',
    opacity: 0.5,
    marginLeft: 10,
  },
  seeAllText: {
    fontSize: 14,
    color: COLOURS.blue,
    fontWeight: '400',
  },
  productListContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  productCard: {
    width: '48%',
    marginVertical: 14,
  },
  cardContainer: {
    width: '100%',
    height: 100,
    borderRadius: 10,
    backgroundColor: COLOURS.backgroundLight,
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  offBadge: {
    position: 'absolute',
    width: '20%',
    height: '24%',
    backgroundColor: COLOURS.green,
    top: 0,
    left: 0,
    borderTopLeftRadius: 10,
    borderBottomRightRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  offText: {
    fontSize: 12,
    color: COLOURS.white,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  productImage: {
    width: '80%',
    height: '80%',
    resizeMode: 'contain',
  },
  productName: {
    fontSize: 12,
    color: COLOURS.black,
    fontWeight: '600',
    marginBottom: 2,
  },
  availabilityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  availableIcon: {
    fontSize: 12,
    marginRight: 6,
    color: COLOURS.green,
  },
  availableText: {
    fontSize: 12,
    color: COLOURS.green,
  },
  unavailableIcon: {
    fontSize: 12,
    marginRight: 6,
    color: COLOURS.red,
  },
  unavailableText: {
    fontSize: 12,
    color: COLOURS.red,
  },
  productPrice: {
    fontSize: 14,
    color: COLOURS.black,
  },
});
