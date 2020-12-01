package org.regitiny.duchoashop.web.rest;

import org.regitiny.duchoashop.RedisTestContainerExtension;
import org.regitiny.duchoashop.DucHoaShopApp;
import org.regitiny.duchoashop.domain.Productdetail;
import org.regitiny.duchoashop.repository.ProductdetailRepository;
import org.regitiny.duchoashop.repository.search.ProductdetailSearchRepository;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;
import javax.persistence.EntityManager;
import java.util.Collections;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.elasticsearch.index.query.QueryBuilders.queryStringQuery;
import static org.hamcrest.Matchers.hasItem;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link ProductdetailResource} REST controller.
 */
@SpringBootTest(classes = DucHoaShopApp.class)
@ExtendWith({ RedisTestContainerExtension.class, MockitoExtension.class })
@AutoConfigureMockMvc
@WithMockUser
public class ProductdetailResourceIT {

    private static final String DEFAULT_PRODUCTSHOPCART = "AAAAAAAAAA";
    private static final String UPDATED_PRODUCTSHOPCART = "BBBBBBBBBB";

    @Autowired
    private ProductdetailRepository productdetailRepository;

    /**
     * This repository is mocked in the org.regitiny.duchoashop.repository.search test package.
     *
     * @see org.regitiny.duchoashop.repository.search.ProductdetailSearchRepositoryMockConfiguration
     */
    @Autowired
    private ProductdetailSearchRepository mockProductdetailSearchRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restProductdetailMockMvc;

    private Productdetail productdetail;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Productdetail createEntity(EntityManager em) {
        Productdetail productdetail = new Productdetail()
            .productshopcart(DEFAULT_PRODUCTSHOPCART);
        return productdetail;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Productdetail createUpdatedEntity(EntityManager em) {
        Productdetail productdetail = new Productdetail()
            .productshopcart(UPDATED_PRODUCTSHOPCART);
        return productdetail;
    }

    @BeforeEach
    public void initTest() {
        productdetail = createEntity(em);
    }

    @Test
    @Transactional
    public void createProductdetail() throws Exception {
        int databaseSizeBeforeCreate = productdetailRepository.findAll().size();
        // Create the Productdetail
        restProductdetailMockMvc.perform(post("/api/productdetails")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(productdetail)))
            .andExpect(status().isCreated());

        // Validate the Productdetail in the database
        List<Productdetail> productdetailList = productdetailRepository.findAll();
        assertThat(productdetailList).hasSize(databaseSizeBeforeCreate + 1);
        Productdetail testProductdetail = productdetailList.get(productdetailList.size() - 1);
        assertThat(testProductdetail.getProductshopcart()).isEqualTo(DEFAULT_PRODUCTSHOPCART);

        // Validate the Productdetail in Elasticsearch
        verify(mockProductdetailSearchRepository, times(1)).save(testProductdetail);
    }

    @Test
    @Transactional
    public void createProductdetailWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = productdetailRepository.findAll().size();

        // Create the Productdetail with an existing ID
        productdetail.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restProductdetailMockMvc.perform(post("/api/productdetails")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(productdetail)))
            .andExpect(status().isBadRequest());

        // Validate the Productdetail in the database
        List<Productdetail> productdetailList = productdetailRepository.findAll();
        assertThat(productdetailList).hasSize(databaseSizeBeforeCreate);

        // Validate the Productdetail in Elasticsearch
        verify(mockProductdetailSearchRepository, times(0)).save(productdetail);
    }


    @Test
    @Transactional
    public void getAllProductdetails() throws Exception {
        // Initialize the database
        productdetailRepository.saveAndFlush(productdetail);

        // Get all the productdetailList
        restProductdetailMockMvc.perform(get("/api/productdetails?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(productdetail.getId().intValue())))
            .andExpect(jsonPath("$.[*].productshopcart").value(hasItem(DEFAULT_PRODUCTSHOPCART)));
    }
    
    @Test
    @Transactional
    public void getProductdetail() throws Exception {
        // Initialize the database
        productdetailRepository.saveAndFlush(productdetail);

        // Get the productdetail
        restProductdetailMockMvc.perform(get("/api/productdetails/{id}", productdetail.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(productdetail.getId().intValue()))
            .andExpect(jsonPath("$.productshopcart").value(DEFAULT_PRODUCTSHOPCART));
    }
    @Test
    @Transactional
    public void getNonExistingProductdetail() throws Exception {
        // Get the productdetail
        restProductdetailMockMvc.perform(get("/api/productdetails/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateProductdetail() throws Exception {
        // Initialize the database
        productdetailRepository.saveAndFlush(productdetail);

        int databaseSizeBeforeUpdate = productdetailRepository.findAll().size();

        // Update the productdetail
        Productdetail updatedProductdetail = productdetailRepository.findById(productdetail.getId()).get();
        // Disconnect from session so that the updates on updatedProductdetail are not directly saved in db
        em.detach(updatedProductdetail);
        updatedProductdetail
            .productshopcart(UPDATED_PRODUCTSHOPCART);

        restProductdetailMockMvc.perform(put("/api/productdetails")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedProductdetail)))
            .andExpect(status().isOk());

        // Validate the Productdetail in the database
        List<Productdetail> productdetailList = productdetailRepository.findAll();
        assertThat(productdetailList).hasSize(databaseSizeBeforeUpdate);
        Productdetail testProductdetail = productdetailList.get(productdetailList.size() - 1);
        assertThat(testProductdetail.getProductshopcart()).isEqualTo(UPDATED_PRODUCTSHOPCART);

        // Validate the Productdetail in Elasticsearch
        verify(mockProductdetailSearchRepository, times(1)).save(testProductdetail);
    }

    @Test
    @Transactional
    public void updateNonExistingProductdetail() throws Exception {
        int databaseSizeBeforeUpdate = productdetailRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restProductdetailMockMvc.perform(put("/api/productdetails")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(productdetail)))
            .andExpect(status().isBadRequest());

        // Validate the Productdetail in the database
        List<Productdetail> productdetailList = productdetailRepository.findAll();
        assertThat(productdetailList).hasSize(databaseSizeBeforeUpdate);

        // Validate the Productdetail in Elasticsearch
        verify(mockProductdetailSearchRepository, times(0)).save(productdetail);
    }

    @Test
    @Transactional
    public void deleteProductdetail() throws Exception {
        // Initialize the database
        productdetailRepository.saveAndFlush(productdetail);

        int databaseSizeBeforeDelete = productdetailRepository.findAll().size();

        // Delete the productdetail
        restProductdetailMockMvc.perform(delete("/api/productdetails/{id}", productdetail.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Productdetail> productdetailList = productdetailRepository.findAll();
        assertThat(productdetailList).hasSize(databaseSizeBeforeDelete - 1);

        // Validate the Productdetail in Elasticsearch
        verify(mockProductdetailSearchRepository, times(1)).deleteById(productdetail.getId());
    }

    @Test
    @Transactional
    public void searchProductdetail() throws Exception {
        // Configure the mock search repository
        // Initialize the database
        productdetailRepository.saveAndFlush(productdetail);
        when(mockProductdetailSearchRepository.search(queryStringQuery("id:" + productdetail.getId())))
            .thenReturn(Collections.singletonList(productdetail));

        // Search the productdetail
        restProductdetailMockMvc.perform(get("/api/_search/productdetails?query=id:" + productdetail.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(productdetail.getId().intValue())))
            .andExpect(jsonPath("$.[*].productshopcart").value(hasItem(DEFAULT_PRODUCTSHOPCART)));
    }
}
