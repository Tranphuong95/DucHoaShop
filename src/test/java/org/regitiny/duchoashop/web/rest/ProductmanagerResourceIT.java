package org.regitiny.duchoashop.web.rest;

import org.regitiny.duchoashop.RedisTestContainerExtension;
import org.regitiny.duchoashop.DucHoaShopApp;
import org.regitiny.duchoashop.domain.Productmanager;
import org.regitiny.duchoashop.repository.ProductmanagerRepository;
import org.regitiny.duchoashop.repository.search.ProductmanagerSearchRepository;

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
 * Integration tests for the {@link ProductmanagerResource} REST controller.
 */
@SpringBootTest(classes = DucHoaShopApp.class)
@ExtendWith({ RedisTestContainerExtension.class, MockitoExtension.class })
@AutoConfigureMockMvc
@WithMockUser
public class ProductmanagerResourceIT {

    private static final String DEFAULT_INPUT_TITLE = "AAAAAAAAAA";
    private static final String UPDATED_INPUT_TITLE = "BBBBBBBBBB";

    private static final String DEFAULT_INPUT_INFORMATION = "AAAAAAAAAA";
    private static final String UPDATED_INPUT_INFORMATION = "BBBBBBBBBB";

    @Autowired
    private ProductmanagerRepository productmanagerRepository;

    /**
     * This repository is mocked in the org.regitiny.duchoashop.repository.search test package.
     *
     * @see org.regitiny.duchoashop.repository.search.ProductmanagerSearchRepositoryMockConfiguration
     */
    @Autowired
    private ProductmanagerSearchRepository mockProductmanagerSearchRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restProductmanagerMockMvc;

    private Productmanager productmanager;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Productmanager createEntity(EntityManager em) {
        Productmanager productmanager = new Productmanager()
            .inputTitle(DEFAULT_INPUT_TITLE)
            .inputInformation(DEFAULT_INPUT_INFORMATION);
        return productmanager;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Productmanager createUpdatedEntity(EntityManager em) {
        Productmanager productmanager = new Productmanager()
            .inputTitle(UPDATED_INPUT_TITLE)
            .inputInformation(UPDATED_INPUT_INFORMATION);
        return productmanager;
    }

    @BeforeEach
    public void initTest() {
        productmanager = createEntity(em);
    }

    @Test
    @Transactional
    public void createProductmanager() throws Exception {
        int databaseSizeBeforeCreate = productmanagerRepository.findAll().size();
        // Create the Productmanager
        restProductmanagerMockMvc.perform(post("/api/productmanagers")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(productmanager)))
            .andExpect(status().isCreated());

        // Validate the Productmanager in the database
        List<Productmanager> productmanagerList = productmanagerRepository.findAll();
        assertThat(productmanagerList).hasSize(databaseSizeBeforeCreate + 1);
        Productmanager testProductmanager = productmanagerList.get(productmanagerList.size() - 1);
        assertThat(testProductmanager.getInputTitle()).isEqualTo(DEFAULT_INPUT_TITLE);
        assertThat(testProductmanager.getInputInformation()).isEqualTo(DEFAULT_INPUT_INFORMATION);

        // Validate the Productmanager in Elasticsearch
        verify(mockProductmanagerSearchRepository, times(1)).save(testProductmanager);
    }

    @Test
    @Transactional
    public void createProductmanagerWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = productmanagerRepository.findAll().size();

        // Create the Productmanager with an existing ID
        productmanager.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restProductmanagerMockMvc.perform(post("/api/productmanagers")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(productmanager)))
            .andExpect(status().isBadRequest());

        // Validate the Productmanager in the database
        List<Productmanager> productmanagerList = productmanagerRepository.findAll();
        assertThat(productmanagerList).hasSize(databaseSizeBeforeCreate);

        // Validate the Productmanager in Elasticsearch
        verify(mockProductmanagerSearchRepository, times(0)).save(productmanager);
    }


    @Test
    @Transactional
    public void getAllProductmanagers() throws Exception {
        // Initialize the database
        productmanagerRepository.saveAndFlush(productmanager);

        // Get all the productmanagerList
        restProductmanagerMockMvc.perform(get("/api/productmanagers?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(productmanager.getId().intValue())))
            .andExpect(jsonPath("$.[*].inputTitle").value(hasItem(DEFAULT_INPUT_TITLE)))
            .andExpect(jsonPath("$.[*].inputInformation").value(hasItem(DEFAULT_INPUT_INFORMATION)));
    }
    
    @Test
    @Transactional
    public void getProductmanager() throws Exception {
        // Initialize the database
        productmanagerRepository.saveAndFlush(productmanager);

        // Get the productmanager
        restProductmanagerMockMvc.perform(get("/api/productmanagers/{id}", productmanager.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(productmanager.getId().intValue()))
            .andExpect(jsonPath("$.inputTitle").value(DEFAULT_INPUT_TITLE))
            .andExpect(jsonPath("$.inputInformation").value(DEFAULT_INPUT_INFORMATION));
    }
    @Test
    @Transactional
    public void getNonExistingProductmanager() throws Exception {
        // Get the productmanager
        restProductmanagerMockMvc.perform(get("/api/productmanagers/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateProductmanager() throws Exception {
        // Initialize the database
        productmanagerRepository.saveAndFlush(productmanager);

        int databaseSizeBeforeUpdate = productmanagerRepository.findAll().size();

        // Update the productmanager
        Productmanager updatedProductmanager = productmanagerRepository.findById(productmanager.getId()).get();
        // Disconnect from session so that the updates on updatedProductmanager are not directly saved in db
        em.detach(updatedProductmanager);
        updatedProductmanager
            .inputTitle(UPDATED_INPUT_TITLE)
            .inputInformation(UPDATED_INPUT_INFORMATION);

        restProductmanagerMockMvc.perform(put("/api/productmanagers")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedProductmanager)))
            .andExpect(status().isOk());

        // Validate the Productmanager in the database
        List<Productmanager> productmanagerList = productmanagerRepository.findAll();
        assertThat(productmanagerList).hasSize(databaseSizeBeforeUpdate);
        Productmanager testProductmanager = productmanagerList.get(productmanagerList.size() - 1);
        assertThat(testProductmanager.getInputTitle()).isEqualTo(UPDATED_INPUT_TITLE);
        assertThat(testProductmanager.getInputInformation()).isEqualTo(UPDATED_INPUT_INFORMATION);

        // Validate the Productmanager in Elasticsearch
        verify(mockProductmanagerSearchRepository, times(1)).save(testProductmanager);
    }

    @Test
    @Transactional
    public void updateNonExistingProductmanager() throws Exception {
        int databaseSizeBeforeUpdate = productmanagerRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restProductmanagerMockMvc.perform(put("/api/productmanagers")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(productmanager)))
            .andExpect(status().isBadRequest());

        // Validate the Productmanager in the database
        List<Productmanager> productmanagerList = productmanagerRepository.findAll();
        assertThat(productmanagerList).hasSize(databaseSizeBeforeUpdate);

        // Validate the Productmanager in Elasticsearch
        verify(mockProductmanagerSearchRepository, times(0)).save(productmanager);
    }

    @Test
    @Transactional
    public void deleteProductmanager() throws Exception {
        // Initialize the database
        productmanagerRepository.saveAndFlush(productmanager);

        int databaseSizeBeforeDelete = productmanagerRepository.findAll().size();

        // Delete the productmanager
        restProductmanagerMockMvc.perform(delete("/api/productmanagers/{id}", productmanager.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Productmanager> productmanagerList = productmanagerRepository.findAll();
        assertThat(productmanagerList).hasSize(databaseSizeBeforeDelete - 1);

        // Validate the Productmanager in Elasticsearch
        verify(mockProductmanagerSearchRepository, times(1)).deleteById(productmanager.getId());
    }

    @Test
    @Transactional
    public void searchProductmanager() throws Exception {
        // Configure the mock search repository
        // Initialize the database
        productmanagerRepository.saveAndFlush(productmanager);
        when(mockProductmanagerSearchRepository.search(queryStringQuery("id:" + productmanager.getId())))
            .thenReturn(Collections.singletonList(productmanager));

        // Search the productmanager
        restProductmanagerMockMvc.perform(get("/api/_search/productmanagers?query=id:" + productmanager.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(productmanager.getId().intValue())))
            .andExpect(jsonPath("$.[*].inputTitle").value(hasItem(DEFAULT_INPUT_TITLE)))
            .andExpect(jsonPath("$.[*].inputInformation").value(hasItem(DEFAULT_INPUT_INFORMATION)));
    }
}
